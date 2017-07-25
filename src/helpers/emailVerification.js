const nodemailer = require('nodemailer');
const bunyan = require('bunyan');

module.exports = (username, email, token) => {
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

  console.log('SMTP Configured');

  let message = {
    to: `${username} <${email}>`,
    subject: 'Please confirm your account',
    text: 'Please confirm your account',
    html: `<p>Hi ${username}, welcome to echo
    <br> Please confirm your account by visiting the following link: <a href="https://echo-af.herokuapp.com/verify/${token}">https://echo-af.herokuapp.com/verify/${token}</a>
    </p>`,
    watchHtml: '<p>Hi apple watch</p>' //just for apple watchHtml
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
