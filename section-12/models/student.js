const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const Task=require('./task')

const userSchema= new mongoose.Schema( {
    name: 
    {
        type: String,
        required: true,
        trim: true
    },
    email: 
    {
        type: String,
        required: true,
        unique:true,
        trim: true,
        lowercase: true,
        validate(value) 
        {
            if (!validator.isEmail(value)) 
            {
                throw new Error('Email is invalid')
            }
        }
    },
    mobile: 
    {
        type: Number,
        default: 0,
        required:true,
        validate(value) 
        {
            if(value<0)
            {
                console.log('error.............')
            }

            // if (!validator.isMobilePhone(value)) {
            //     throw new Error('mobile number must be 10 characters')
            // }
        }
    },
    password: 
    {
            type: String,
            required: true,
            minlength: 7,
            trim: true,
            validate(value) 
            {
                if (value.toLowerCase().includes('password')) 
                {
                    throw new Error('Password cannot contain "password"')
                }
            }
    } ,
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }] 

})

userSchema.virtual('tasks',{
    ref:'Task',
    localField:'_id',
    foreignField:'owner'
})

//password hashing
userSchema.pre('save',async function(next){
    const student=this
    if(student.isModified('password'))
    {
        student.password=await bcrypt.hash(student.password,8)
    }
    next()
})

//delete user tasks when user is removed
userSchema.pre('remove',async function(next){
    const student=this
    await Task.deleteMany({owner:student.id})
    next()
})

userSchema.methods.toJSON= function()
{ 
    const student=this
    const studentObject=student.toObject()

    delete studentObject.password
    delete studentObject.tokens

    return studentObject
}

userSchema.methods.generateAuthToken= async function()
{
    //console.log("generate token function called..")
    const student=this;
    //console.log(student)
    const token=jwt.sign({_id:student._id.toString()},'thisisnewforme',{expiresIn:'7 days'})
    //console.log("token...",token)
    student.tokens = student.tokens.concat({ token })
    await student.save()
    return token
}

userSchema.statics.findByCredentials=async(email,password)=>{
    //console.log(email)
     //   console.log(password)
    const student=await Student.findOne({email})
    //console.log("HI....",student)
    if(!student)
    {
     throw new Error('Unable to login !')   
    }

    const isMatch=await bcrypt.compare(password,student.password)
    //console.log("ismatch..",isMatch)
    if(!isMatch)
    {
        throw new Error('Credentials wrong!')
    }
    //console.log("student...",student)
    return student
}

const Student = mongoose.model('Student',userSchema)

module.exports=Student
