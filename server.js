require('dotenv').config();
const port_num=8000
const express = require('express')
const app = express()
const userRouter= require("./router/user")
const permissionRouter= require("./router/permission")
const errorMessage =require("./router/error_message")
const all_api =require("./router/all_api")
const {UserIPLog} = require("./models")

app.set('port',port_num)
app.use(express.json())
app.use('/', all_api);



app.use('/user',userRouter)
app.use('/permission',permissionRouter)
app.use('/errorMessage',errorMessage)


app.use((req, res, next)=> {
  res.status(404).json({message : 'api not found (no match entry-point)'});
})

app.listen(app.get('port'),()=>{
  console.log('server is running on ', app.get('port'));
})