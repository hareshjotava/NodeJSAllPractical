const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

const publicDirectoryPath = path.join(__dirname, './public')
console.log(publicDirectoryPath)
const viewsPath = path.join(__dirname, './views')

app.set('view engine', 'hbs')
app.set('views', viewsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    
    res.render('index', {
        title: 'home',
        name: 'Haresh'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})