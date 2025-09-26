 const nodeMailer  = require('nodemailer');
 const dotenv = require("dotenv");

 //loads the environmental varibles from the env file
dotenv.config();

 const transporter = nodeMailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: process.env.EMAIL_SECURE=== "true",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
        tls: {
            rejectUnauthorized: false
        }

 });

 // Verify the connection configuration
transporter.verify((error, success) => {
    if (error) {
        console.error('Error setting up transporter:', error);
    }
    else {
        console.log('Mail transporter configured successfully:', success);
    }
});

const sendEmail = async (emailOptions) => {
    try {
        const { to, subject, text, html } = emailOptions;
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: emailOptions.to,
            subject: emailOptions.subject,
            text: emailOptions.text,
            html: emailOptions.html,
        };
        await transporter.sendMail(mailOptions);
    }
    catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send email');
    }
};
module.exports= {sendEmail}; transporter
