const nodemailer = require("nodemailer");
const { promisify } = require("util");
const fs = require("fs");
const readFileAsync = promisify(fs.readFile);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "pjm970128@gmail.com",
    pass: "hdgy kdoq dpdp sztl",
  },
});

async function main() {
  const htmlTemplate = await readFileAsync("test.html", "utf-8");
  const textTemplate = await readFileAsync("test.txt", "utf-8");
  const imgTemplate = await readFileAsync("test.png");
  const replacedHtml = htmlTemplate.replace(
    "{{LINK_URL}}",
    textTemplate.trim()
  );

  const info = await transporter.sendMail({
    from: "pjm970128@gmail.com",
    to: "juhani27@naver.com",
    subject: "사용자의 접속 위치가 변경되었습니다.",
    html: replacedHtml,
    attachments: [
      {
        filename: "user_location_map",
        content: imgTemplate,
        encoding: "base64",
        cid: "uniqueImageCID",
      },
    ],
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

main().catch(console.error);
