require('dotenv').config();
const port_num=8000
const express = require('express')
const app = express()
const userRouter= require("./router/user")
const permissionRouter= require("./router/permission")
const errorMessageRouter =require("./router/error_message")
const articleRouter = require("./router/article")
const all_api =require("./router/all_api")


app.set('port',port_num)
app.use(express.json())
app.use(express.urlencoded());
app.use('/', all_api);

app.use('/user',userRouter)
app.use('/permission',permissionRouter)
app.use('/error_message',errorMessageRouter)
app.use('/article',articleRouter)


app.listen(app.get('port'),()=>{
  console.log('server is running on ', app.get('port'));
})