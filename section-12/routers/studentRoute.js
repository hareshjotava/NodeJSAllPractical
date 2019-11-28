const express=require('express')
const router=new express.Router();
const auth=require('../middleware/auth')
const Student = require('../models/student')

router.post('/student', async(req, res) => {
    // res.send("testing")
     const student = new Student(req.body)
 
     try {
         await student.save()
         const token=await student.generateAuthToken()
         res.status(201).send({student,token})
     } catch (e) {
         res.status(400).send(e)
     }
     // student.save().then(() => {
     //     res.send()
     // }).catch((e) => {
     //     res.status(400).send(e)
     // })
 })
 
 router.get('/student',auth,async (req, res) => {
    
     try {
         const students = await Student.find({})
         res.send(students)
     } catch (e) {
         res.status(500).send()
     }
     // Student.find({}).then((students)=>{  
     //     res.send(students);
     // }).catch((e)=>{
     //     res.status(500).send(e)
     // })
  })

  router.get('/student/me',auth,async (req, res) => {
    res.send(req.student)
 })
 
router.post('/student/logout',auth,async(req,res)=>{
    console.log("logout page....")
    try {
       req.student.tokens=req.student.tokens.filter((token)=>{
           console.log(token)
            return token.token!==req.token
       }) 
       await req.student.save()
       res.send()
    } catch (e) {
        res.status(500).send(e)
    }
})

router.post('/student/logoutAll',auth,async(req,res)=>{
     try {
       req.student.tokens=[]
       await req.student.save()
       res.send()
    } catch (e) {
        res.status(500).send(e)
    }
})

  router.get('/student/:id', async(req, res) => {
    
     const _id= req.params.id;
    // console.log(_id)
     // Student.findById({_id}).then((student)=>{
     //     if(!student)
     //     {
     //       return res.status(404).send()
     //     }
     //     res.send(student)
     // }).catch((e) => {
     //     // console.log('in')
     //     res.status(500).send(e)
     // })
     try {
         const student = await Student.findById(_id)
 
         if (!student) {
             return res.status(404).send()
         }
 
         res.send(student)
     } catch (e) {
         res.status(500).send()
     }
  })
 
  router.patch('/student/me',auth,async(req,res)=>{
        const updates=  Object.keys(req.body)
        const allowupdate=['name','password','email','mobile'] 
        //console.log(updates)
        const isValidOperation=updates.every((update)=>{
            //console.log(update)
            return allowupdate.includes(update)
            
        })
        console.log(isValidOperation)
        if(!isValidOperation){
            return res.status(400).send({ error: 'Invalid updates!' })
        }
 
        //const student=Student.findByIdAndUpdate(req.params.id,{name:'vijay',email:'vijay@gmail.com',mobile:8758632025})
        //console.log(req.params.id)
         //const student= await Student.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
    try{
        //console.log("req student",req.student)
         updates.forEach((update)=>{
             console.log("foreach",update)
             console.log(req.body[update])
             req.student[update]=req.body[update]
         })
         console.log("After Update..",req.student)
         await req.student.save()
         res.send(req.student)
     }catch(e)
     {
        res.sendStatus(400).send(e)
     }
 })
 
 router.delete('/student/me',auth,async(req,res)=>{
      try{
    //      const student=await Student.findByIdAndDelete(req.params.id)
 
    //      if(!student)
    //      {
    //          return res.status(404).send()
    //      }
        await req.student.remove()
         res.send(req.student)
     }catch(e)
     {
         return res.status(500).send(e)
     }
 })

 router.post('/student/login',async(req,res)=>{
    try{
        console.log("login...")
        //console.log(req.body.email)
        //console.log(req.body.password)
        const student=await Student.findByCredentials(req.body.email,req.body.password)
        const token=await student.generateAuthToken()

        res.send({student,token})
    }catch(e)
    {
        res.status(400).send(e)
    }
 })
 
module.exports=router