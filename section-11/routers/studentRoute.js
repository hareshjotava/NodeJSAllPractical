const express=require('express')
const router=new express.Router();
const Student = require('../models/student')

router.post('/student', async(req, res) => {
    // res.send("testing")
     const student = new Student(req.body)
 
     try {
         await student.save()
         res.status(201).send(student)
     } catch (e) {
         res.status(400).send(e)
     }
     // student.save().then(() => {
     //     res.send()
     // }).catch((e) => {
     //     res.status(400).send(e)
     // })
 })
 
 router.get('/student',async (req, res) => {
    
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
 
  router.patch('/student/:id',async(req,res)=>{
     try{
        const updates=  Object.keys(req.body)
        const allowupdate=['name','password','email','mobile'] 
        //console.log(updates)
        const isValidOperation=updates.every((update)=>{
            console.log(update)
            return allowupdate.includes(update)
            
        })
        console.log(isValidOperation)
        if(!isValidOperation){
           // res.sendStatus(400).send({ error: 'Invalid updates....' })
           return res.status(400).send({ error: 'Invalid updates!' })
        }
 
        //const student=Student.findByIdAndUpdate(req.params.id,{name:'vijay',email:'vijay@gmail.com',mobile:8758632025})
        //console.log(req.params.id)
         const student= await Student.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
 
         if(!student)
         {
             res.sendStatus(404).send();
         }
         res.send(student)
     }catch(e)
     {
        res.sendStatus(400).send(e)
     }
 })
 
 router.delete('/student/:id',async(req,res)=>{
     try{
         const student=await Student.findByIdAndDelete(req.params.id)
 
         if(!student)
         {
             return res.status(404).send()
         }
         res.send(student)
     }catch(e)
     {
         return res.status(500).send(e)
     }
 })
 
module.exports=router