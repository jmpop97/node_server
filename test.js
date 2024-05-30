require('dotenv').config();
const user = require("./modules/user")
const seed_db=require("./modules/seedDB")
const models=require("./models")
const nodemailer = require('nodemailer');
const fs = require('node:fs');  
const cheerio = require('cheerio')


// let name="test"
const mail_html=fs.readFileSync('email_form/normal_form.html', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
});
const mail_form=cheerio.load(mail_html)

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.google_id,
    pass: process.env.google_email
  }
});





async function test(){
  let title="제목"
  let body="내용"
  mail_form('title').text(title)
  mail_form('body').text(body)
  const mailOptions = {
    from: 'pjm970128@gmail.com', // 작성자
    to: 'canwim00@gmail.com', // 수신자
    subject: '동적 이메일', // 메일 제목
    html: mail_form.html(),
    attachments:[{
      filename:'email_form/이렘눈치.png',
      path:'email_form/이렘눈치.png'
    }]
  };
  transporter.sendMail(mailOptions, function(error, info){
      if (error) {
          console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
          }
        });
}
      
test()