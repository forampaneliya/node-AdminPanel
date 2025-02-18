const nodemailer = require("nodemailer");


const mailConfig=async(msg)=>{
    const transporter = nodemailer.createTransport({
        service: "gmail",
        port: 587,
        secure: false, 
        auth: {
          user: "forampaneliya1204@gmail.com",
          pass: "biijiajptsqyxrjy",
        },
      });

      await transporter.sendMail(msg);
      console.log("mail send sucessfully");
      
}
module.exports=mailConfig