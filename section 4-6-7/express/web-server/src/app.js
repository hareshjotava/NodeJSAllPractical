const path=require('path')
const express=require('express')

const app= express()

const publicDirectoryPath = path.join(__dirname, '../public')
//console.log(publicDirectoryPath)
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
res.send('Home Page!<h1>Home</h1>')
})

app.get('/About',(req,res)=>{
    res.send({
        name:'Haresh',
        surname:'Jotava'
    })
    //res.send()
})

app.get('/Logout',(req,res)=>{
    res.send('Logout Page!')
    })

app.listen(5000,()=>{
    console.log('server is up port no 5000')
})