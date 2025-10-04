const nodeMailer  = require('nodemailer');
const dotenv = require("dotenv");
const path = require("path");

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, "../.env") });


const transporter = nodeMailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT), 
  secure: process.env.EMAIL_SECURE.toLowerCase() === "true", 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Verify transporter
transporter.verify((error, success) => {
  if (error) {
    console.error('Error setting up transporter:', error);
  } else {
    console.log('Mail transporter configured successfully:', success);
  }
});

const sendEmail = async (emailOptions) => {
  try {
    const mailOptions = {
      from: `"TechyJaunt Verification" <${process.env.EMAIL_USER}>`, 
      to: emailOptions.to,
      subject: emailOptions.subject,
      text: emailOptions.text,
      html: emailOptions.html,
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully to:", emailOptions.to);
  } catch (error) {
    console.error('❌ Error sending email:', error.message);
    throw new Error('Failed to send email');
  }
};

module.exports = { sendEmail };
