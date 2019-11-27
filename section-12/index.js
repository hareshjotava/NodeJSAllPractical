const express = require('express')
require('./db/mongoose')

const studentsRouter=require('./routers/studentRoute')
const tasksRouter=require('./routers/taskRoute')

const app = express()
const port = process.env.PORT || 3000

// app.use((req,res,next)=>{
//     console.log(req.method ,'.....',req.path)
//     if(req.method==='GET')
//     {
//         res.send("GET request are disabled...")
//     }else
//     {
//         next()
//     }
// })

app.use(express.json())
app.use(studentsRouter)
app.use(tasksRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})