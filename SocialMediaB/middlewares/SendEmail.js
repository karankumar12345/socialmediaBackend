const nodemailer = require('nodemailer');

exports.sendEmail = async (options) => {
    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "024c2faee0031d",
          pass: "e0da709a92653e"
        }
      });
    const mailOptions = {
        from: process.env.SMPT_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message
    };

    await transport.sendMail(mailOptions);
};
