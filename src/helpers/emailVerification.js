const nodemailer = require('nodemailer');
const bunyan = require('bunyan');

require('env2')('./config.env');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'echo.annafreud@gmail.com',
    pass: 'FAC!echo1',
  },
  logger: bunyan.createLogger({
    name: 'nodemailer',
  }),
  debug: true,
}, {
  from: 'Echo do-not-reply <echo.annafreud@gmail.com>',
});

const sendEmail = (username, email, token, cb) => {
  const message = {
    to: `${username} <${email}>`,
    subject: 'Please confirm your account',
    text: 'Please confirm your account',
    html: `<p>Hi ${username}, welcome to echo
    <br> Please confirm your account by visiting the following link: <br><br><a href="${process.env.HOST}/verify/${token}/${username}">${process.env.HOST}/verify/${token}/${username}</a>
    </p>`,
  };

  console.log('sending email');

  transporter.sendMail(message, (err, info, transporter) => {
    if (err) {
      cb(err);
      return;
    }
    cb(null, info);
    transporter.close();
  });
};

const passwordReset = (username, email, token, cb) => {
  const message = {
    to: `${username} <${email}>`,
    subject: 'Please reset your Echo password',
    text: 'Please reset your Echo password',
    html: `<p>Hi ${username},
    <br><br> You are receiving this because you (or someone else) have requested the reset of the password for your account.
    <br><br> Please click on the following link, or paste this into your browser to complete the process:
    <br><br><a href="${process.env.HOST}/reset/${token}/${username}">${process.env.HOST}/reset/${token}/${username}</a>
    <br><br> If you did not request this, please ignore this email and your password will remain unchanged.
    </p>`,
  };

  console.log('sending email');

  transporter.sendMail(message, (err, info, transporter) => {
    if (err) {
      cb(err);
      return;
    }
    cb(null, info);
    transporter.close();
  });
};

module.exports = {
  sendEmail,
  passwordReset,
};
