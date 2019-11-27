const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-mgr-api', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

const testValidator = mongoose.model('testValidator', {
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

const testVal = new testValidator({
    name: '   Haresh  ',
    email: 'Hare@Gmail.COM   ',
    mobile: 9726378798,
    password : 'haresh555'
})

testVal.save().then(() => {
    console.log(testVal)
}).catch((error) => {
    console.log('Error!', error)
})

