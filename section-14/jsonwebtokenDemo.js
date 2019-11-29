const jwt=require('jsonwebtoken')

const myFun=async()=>{
   const token= await jwt.sign({_id:'abc123'},'thisisnewforme',{expiresIn:'7 seconds'})
   console.log(token)

   const data=jwt.verify(token,'thisisnewforme')
   console.log(data)
}

myFun()