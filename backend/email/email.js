const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

//loads the environmental varibles from the env file
dotenv.config();

// // Create a transporter
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
  port: 465,
  secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
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
// Function to send emails
const sendEmail = async (emailOptions) => {
    try {
        const { to, subject, text, html } = emailOptions;
        const mailOptions = {
            from: process.env.SMTP_USER,
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
module.exports= {sendEmail};



