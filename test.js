require('dotenv').config();
const user = require("./modules/user")
const seed_db=require("./modules/seedDB")
const models=require("./models")
const nodemailer = require('nodemailer');
const fs = require('node:fs');  
const cheerio = require('cheerio')
const {Email} = require('./modules/send_email')
const User =require('./modules/user')

email='canwim00@gmail.com'
type="User"
key="aae2a85a5c5f35e2078be83852b1256aa0b57344"
// new User.Authenfication({email,type}).AuthenficationCreate()
new User.Authenfication({email,type,key}).AuthenficationAfter()

// new User.Authenfication({email:email}).AuthenficationAfter()

// var transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.google_id,
//     pass: process.env.google_email
//   }
// });





// async function test(){
//   let title="제목"
//   let body="내용"
//   const mailOptions = {
//     from: 'pjm970128@gmail.com', // 작성자
//     to: 'canwim00@gmail.com', // 수신자
//     subject: '동적 이메일', // 메일 제목
//     text: 'hi',
//     attachments:[{
//     }]
//   };
//   transporter.sendMail(mailOptions, function(error, info){
//       if (error) {
//           console.log(error);
//         } else {
//             console.log('Email sent: ' + info.response);
//           }
//         });
// }
      
// test()