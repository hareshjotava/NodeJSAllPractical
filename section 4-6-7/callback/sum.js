 const sum=(x,y,callback1)=>{
     setTimeout(()=>{
         callback1(x+y)
     },3000)
 }

 sum(7,5,(sum)=>{
     console.log('Sum is : ',sum);
 })

