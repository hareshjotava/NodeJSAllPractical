const mongoose=require('mongoose');

const url="mongodb://127.0.0.1:27017/task-mng-api"

mongoose.connect("mongodb://127.0.0.1:27017/task-mng-api",{useUnifiedTopology:true,useNewUrlParser:true,useCreateIndex:true},()=>
{
    console.log("successfully database created..")
})

const testModel=mongoose.model('testModel',{
    name:{
        type:String,
        require:true
    },
    mobile:{
        type:Number,
        require:true
    }
})

const test=new testModel(
    {
        name:"Haresh",
        
    }
)

test.save().then(()=>{
    console.log(test)
}).catch((error)=>{
    console.log("Error : ",error)
})