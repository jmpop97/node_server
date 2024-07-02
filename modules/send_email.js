const nodemailer = require('nodemailer');
const fs = require('fs');  
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
        this.form=form ? form : 'normal_form'
        this.body=body
        this.transporter=transporter

        this.email_form()
    }
    async email_form(){
        let {form,body}=this
        let email_form=await this.html_dic()
        this.send(email_form)
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
    async html_dic(){
    let html=email_forms[this.form]
    let dic = this.body
    let result=''
    let times=html.length
    for (i=0; i<times;i++){
        let add=html[i]
        if (add == '$' && html[i+1]=='{'){
            i+=1
            let adds=''
            while(i<times){
                i+=1
                add=html[i]
                if (html[i]=='}'){
                    add=dic[adds] ? dic[adds] : ''
                    break
                }
                adds+=add
            }
        }
        result+=add
    }
    return result
    }
}


// console.log(email_forms['normal_form']('title').text())
module.exports={Email}