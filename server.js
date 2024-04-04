const port_num=8000

const userRouter= require("./router/user")
const express = require('express')
const app = express()

app.set('port',port_num)
app.use(express.json())
app.use('/user',userRouter)


app.use((req, res, next)=> {
  res.status(404).json({message : 'api not found (no match entry-point)'});
})

app.listen(app.get('port'),()=>{
  console.log('server is running on ', app.get('port'));
})