console.log('Client side javascript file is loaded!')


const frm=document.querySelector('form')
const inp=document.querySelector('input')


frm.addEventListener('submit',(e)=>{
       e.preventDefault()
       console.log('form submit')
       console.log(inp.value)
})


inp.addEventListener('keypress',()=>
{
       console.log('input key press event call')
})