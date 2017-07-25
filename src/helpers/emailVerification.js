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
    // headers: {
    //   'wtf is a header': 1000
    // }
  });

  console.log('SMTP Configured');

  let message = {
    to: `${username} <${email}>`,
    subject: 'Please confirm your account',
    text: 'Hello this is text',
    html: '<p><b>Hello</b> this is html</p>',
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
