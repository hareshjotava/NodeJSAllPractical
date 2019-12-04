const jwt=require('jsonwebtoken')
const Student=require('../models/student')

const auth=async(req,res,next)=>
{
    console.log("auth middleware")
    //console.log(req.header('Authorization'))
    try{
        const token=req.header('Authorization').replace('Bearer ','')
        const decode=jwt.verify(token,'thisisnewforme')
        console.log("header token :",token)

        const student=await Student.findOne({_id:decode._id,'tokens.token':token})
        console.log(student)
        if(!student)
        {
            throw new Error()
        }
        req.token=token
        req.student=student
        next()
    }catch(e)
    {
        res.status(401).send({error:'please authenticate.'})
    }
    //next()
}

module.exports=auth