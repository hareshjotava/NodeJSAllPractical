const bcrypt=require('bcryptjs')

const myfun=async()=>{
    const password="123@abc"
    const hashedpassword= await bcrypt.hash(password,8)

    console.log('Password :',password)
    console.log('hased pass :',hashedpassword)


    const isMatch=await bcrypt.compare('123@abc',hashedpassword)
    console.log(isMatch)
}

myfun()