const express=require('express')
const router=new express.Router();
const auth=require('../middleware/auth.js')
const Task = require('../models/task')

router.post('/task', auth,async(req, res) => {
    //const task = new Task(req.body)
 
    const task = new Task({
        ...req.body,
        owner:req.student._id
    })

    console.log(task)
    //  task.save().then(() => {
    //      res.send(task)
    //  }).catch((e) => {
    //      res.status(400).send(e)
    //  })
    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
 })

 router.get('/task', auth,async(req, res) => {
   
    // Task.find({}).then((tasks)=>{  
    //     res.send(tasks);
    // }).catch((e)=>{
    //     res.status(500).send(e)
    // })
    try {
        const tasks = await Task.find({owner:req.student._id})
        res.send(tasks)
    } catch (e) {
        res.status(500).send()
    }
 })

 router.get('/task/:id',auth,async (req, res) => {
   
    const _id=req.params.id
    // Task.find({_id}).then((task)=>{  
    //    if(!task)
    //    {
    //     return res.status(404).send()
    //    }
    //     res.send(task);
    // }).catch((e)=>{
    //     res.status(500).send(e)
    // })
    try {
        //const task = await Task.findById(_id)
        //const task = await Task.findOne({_id,owner:req.student._id})
        await req.student.populate(tasks).execPopulate()
        // if (!tasks) {
        //     return res.status(404).send()
        // }

        res.send(req.student.tasks)
    } catch (e) {
        res.status(500).send()
    }
 })

 router.patch('/task/:id',auth,async(req,res)=>{
    try{
       const updates=  Object.keys(req.body)
       const allowupdate=['completed','description'] 
       const isValidOperation=updates.every((update)=>{
          // console.log(update)
           return allowupdate.includes(update)
           
       })
       //console.log(isValidOperation)
       if(!isValidOperation){
          // res.sendStatus(400).send({ error: 'Invalid updates....' })
          return res.status(400).send({ error: 'Invalid updates!' })
       }
       //const task= await Task.findByIdAndUpdate(req.params.id)
       const task= await Task.findOne({_id:req.params.id,owner:req.student._id})

        if(!task)
        {
            res.sendStatus(404).send();
        }

        updates.forEach((update)=>{
            task[update]=req.body[update]
        })
        await task.save()
         //const task= await Task.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})

        res.send(task)
    }catch(e)
    {
       res.sendStatus(400).send(e)
    }
})
 
router.delete('/task/:id',auth,async(req,res)=>{
    try{
        //const task=await Task.findByIdAndDelete(req.params.id)
        const task=await Task.findOneAndDelete({_id:req.params.id,owner:req.student._id})
        if(!task)
        {
            return res.status(404).send()
        }
        res.send(task)
    }catch(e)
    {
        return res.status(500).send(e)
    }
})


module.exports=router