const express = require('express')
require('./db/mongoose')
const Student = require('./models/student')
const Task = require('./models/task')


// Student.findByIdAndUpdate('5dd7c4af201a8e0b3113e6a2',{email:"prakashjotava@h.com"}).then((student)=>{
//     console.log(student)
//     return Student.countDocuments({name:'prakash'})
// }).then((result)=>{
//     console.log(result)
// }).catch((e)=>{
//     console.log(e)
// })

const updateAgeAndCount = async (id, email) => {
    const user = await Student.findByIdAndUpdate(id, { email })
    const count = await Student.countDocuments({ email })
    return count
}

updateAgeAndCount('5dd7c4af201a8e0b3113e6a2', 'prakash@gmail.com').then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})

const deleteTaskAndCount = async (id) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({ completed: false })
    return count
}

deleteTaskAndCount('5dd7a423641fc308c5609571').then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})

