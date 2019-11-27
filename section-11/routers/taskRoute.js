const express=require('express')
const router=new express.Router();
const Task = require('../models/task')

router.post('/task', async(req, res) => {
    const task = new Task(req.body)
 
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

 router.get('/task', async(req, res) => {
   
    // Task.find({}).then((tasks)=>{  
    //     res.send(tasks);
    // }).catch((e)=>{
    //     res.status(500).send(e)
    // })
    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (e) {
        res.status(500).send()
    }
 })

 router.get('/task/:id',async (req, res) => {
   
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
        const task = await Task.findById(_id)

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
 })

 router.patch('/task/:id',async(req,res)=>{
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

        const task= await Task.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})

        if(!task)
        {
            res.sendStatus(404).send();
        }
        res.send(task)
    }catch(e)
    {
       res.sendStatus(400).send(e)
    }
})
 
router.delete('/task/:id',async(req,res)=>{
    try{
        const task=await Task.findByIdAndDelete(req.params.id)

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