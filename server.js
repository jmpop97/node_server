require('dotenv').config();
const port_num=8000
const express = require('express')
const app = express()
const all_api =require("./router/all_api")
require('./modules/EternalReturn')
app.set('trust proxy',true)

app.get('/',(rep,res)=>{
  res.send("hi")
})

app.set('port',port_num)
app.use(express.json())
app.use('/', all_api);

const fs = require('fs')
const router_dir = __dirname+'/./router'
const router_files = fs.readdirSync(router_dir)

for(var i = 0; i < router_files.length; i++){
  var file = router_files[i];
  var suffix = file.split('.'); // 확장자 추출
  if (suffix[1] === 'js' && suffix[0]!='all_api'){
    console.log(suffix[0])
      app.use('/'+suffix[0],require('./router/'+suffix[0]))
}
}


app.listen(app.get('port'),()=>{
  console.log('server is running on ', app.get('port'));
})