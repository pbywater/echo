const nodemailer = require('nodemailer');
const bunyan = require('bunyan');

require('env2')('./config.env');

let transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'echo.annafreud@gmail.com',
    pass: 'FAC!echo1'
  },
  logger: bunyan.createLogger({
    name: 'nodemailer'
  }),
  debug: true
}, {
  from: 'Echo do-not-reply <echo.annafreud@gmail.com>',
});

module.exports = (username, email, token) => {

  let message = {
    to: `${username} <${email}>`,
    subject: 'Please confirm your account',
    text: 'Please confirm your account',
    html: `<p>Hi ${username}, welcome to echo
    <br> Please confirm your account by visiting the following link: <br><br><a href="${process.env.HOST}/verify/${token}/${username}">${process.env.HOST}/verify/${token}/${username}</a>
    </p>`
  };

  console.log('sending email');

  transporter.sendMail(message, (err, info) => {
    if(err){
      console.log('Error occured');
      console.log('error.message');
      return;
    }
    console.log('Message sent successfully!');
    console.log('Server responded with "%s"', info.response);
    transporter.close();
  })
}
