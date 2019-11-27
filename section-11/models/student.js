const mongoose = require('mongoose')
const validator = require('validator')


const Student = mongoose.model('Student', {
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
        }    
})

module.exports=Student
