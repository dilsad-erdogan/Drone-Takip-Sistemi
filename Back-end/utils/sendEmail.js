const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    const transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 587,
        secure: false, // TLS kullanılacaksa 'true', kullanılmayacaksa 'false'
        auth: {
          user: "798a37b26d3d76",
          pass: "79004c367dee1e",
        }
    })

    const emailOptions = {
        from: 'dilsadrukiyeerdogan@gmail.com',
        to: options.to,
        subject: options.subject,
        html: options.text
    }

    await transporter.sendMail(emailOptions);
}

module.exports = sendEmail;