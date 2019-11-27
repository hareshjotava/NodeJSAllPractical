const jwt=require('jsonwebtoken')
const Student=require('../models/student')

const auth=async(req,res,next)=>
{
    //console.log("auth middleware")
    try{
        const token=req.header('Authorization').replace('Bearer ','')
        const decode=jwt.verify(token,'thisisnewforme')
        //console.log("header token :",token)

        const student=await Student.findOne({_id:decode._id,'tokens.token':token})
        if(!student)
        {
            throw new Error()
        }
    }catch(e)
    {
        res.status(401).send({error:'please authenticate.'})
    }
    //next()
}

module.exports=auth