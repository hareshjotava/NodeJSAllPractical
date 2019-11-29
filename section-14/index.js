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


const multer=require('multer')

const upload=multer({
    dest: 'images',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(doc|docx)$/)) {
            return cb(new Error('Please upload a Word document'))
        }

        cb(undefined, true)
    }
})

app.post('/upload', upload.single('uploadone'), (req, res) => {
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})


app.use(express.json())
app.use(studentsRouter)
app.use(tasksRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})


// const Task=require('./models/task')
// const Student=require('./models/student')

// const main=async()=>{
//     const student=await Student.findById('5ddf9aa60d461a13449d6a5b')
//     await student.populate('tasks').execPopulate()
//     console.log(student.tasks)
// }
// main()

