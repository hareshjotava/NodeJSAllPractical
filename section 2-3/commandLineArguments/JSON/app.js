const fs=require('fs')
const dataBuffer=fs.readFileSync('json-1.json')
const dataJSON=dataBuffer.toString();
const user=JSON.parse(dataJSON)

user.name='Haresh'
user.age=23

const userJSON=JSON.stringify(user)
fs.writeFileSync('json-1.json',userJSON)

console.log(userJSON)
//const userJSON = JSON.stringify(user)
//fs.writeFileSync('1-json.json', userJSON)