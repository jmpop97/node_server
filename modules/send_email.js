const nodemailer = require('nodemailer');
const fs = require('fs');  
const cheerio = require('cheerio');
const email_dir=__dirname+'/../email_form'
const files = fs.readdirSync(email_dir)
//email_from setting
let email_forms = {}
for(var i = 0; i < files.length; i++){
    var file = files[i];
    var suffix = file.split('.'); // 확장자 추출
    if (suffix[1] === 'html'){
        let html=fs.readFileSync(email_dir+'/'+file, 'utf8', (err, data) => {
            if (err) {
              console.error(file,err);
              return;
            }
          });
          email_forms[suffix[0]]=html
}
}

//mail setting
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.google_id,
    pass: process.env.google_email
  }
});

class Email{
    constructor(params){
        let {email,form,body}=params
        this.email=email
        this.form=form
        this.body=body
        this.transporter=transporter

        this.email_form()
    }
    async email_form(){
        let {form,body}=this
        let email_form=cheerio.load(email_forms[form])
        for(let key in body){
            email_form(`div[id=${key}]`).text(body[key])
        }
        this.send(email_form.html())
    }
    
    async send(email_form){
        const mailOptions = {
        from: 'pjm970128@gmail.com', // 작성자
        to: this.email, // 수신자
        subject: this.body.title, // 메일 제목
        html: email_form,
        attachments:this.body.files?.map(x=>{
          return {filename:x,
          path:x}
        })}

        transporter.sendMail(mailOptions,function(error,info){
          if(error){
            console.log(error);
          }
          else{
            console.log(`Email send: ${info.response}`)
          }
        });
    };
}


// console.log(email_forms['normal_form']('title').text())
module.exports={Email}