const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_MAIL,
    port: process.env.PORT_MAIL,
    secure: true, // upgrade later with STARTTLS
    auth: {
      user: process.env.USER_MAIL,
      pass: process.env.PASSWORD_MAIL,
    },
  });

  module.exports = { transporter } 

