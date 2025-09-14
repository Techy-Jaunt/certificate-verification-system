const axios = require("axios");
const transporter = require("../email/email");
const otpGenerator = require('otp-generator');
const otpCache = require("../utils/otpCache");
const dotenv = require("dotenv");

//loads the environmental varibles from the env file
dotenv.config();

// Data URL for fetching spreadsheet data
const DATA_URL = process.env.DATA_URL

// Sends Otp
const validateAlumniDetails = async (req, res) => {

    try {
        // Destructure the data
        const { email, cohort, track } = req.body;
        if (!email || !cohort || !track) {
            return res.status(400).json({ status: 'error', message: 'Email, cohort, and track are required' });
        }

        // Fetch data from the Google Apps Script
        const response = await axios.get(DATA_URL);
        const records = response.data;

        // Ensure records is always an array
        const dataArray = Array.isArray(records) ? records : [records];

        // Find the Alumni record that matches the provided email, cohort, and track
        const record = dataArray.find(item =>
            item.Email?.toLowerCase() === email.toLowerCase() && String(item.Cohorts) === String(cohort));

        // If no matching record is found, return an error response
        if (!record) {
            return res.status(404).json({ status: 'error', message: 'Alumni Record not found' });
        }

        // If a matching record is found, generate a one-time password (OTP) that expires in 10 minutes
        const otp = otpGenerator.generate(6, { upperCase: false, specialChars: false, lowerCaseAlphabets: false });
        const otpExpiry = Date.now() + 10 * 60 * 1000;

        // Store the OTP in the cache
        otpCache.set(record.Email, { otp, expiry: otpExpiry });

        // Send the OTP to the user's email
        await transporter.sendMail({
            to: record.Email,
            subject: 'Your OTP Code',
            text: `Your OTP code is ${otp}. It is valid for 10 minutes.`,
        });

        return res.status(200).json({ status: 'success', message: 'OTP sent' });
    } catch (err) {
        console.error("Validation Error:", err);
        return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};


// Verify Otp
const verifyAlumniOtpHandler = async (req, res) => {
  try {
    const { email, otp } = req.validatedOtpData;

    // Fetch data from the Google Apps Script
    const response = await axios.get(DATA_URL);
    if (!response) {
      return res
        .status(404)
        .json({
          status: "Fail",
          message: "Error fetching data from google sheet",
        });
    }
    const records = response.data;

    // Ensure records is always an array
    const dataArray = Array.isArray(records) ? records : [records];

    // Find the Alumni record that matches the provided email
    const record = dataArray.find(
      (item) => item.Email?.toLowerCase() === email.toLowerCase()
    );

    if (!record) {
      return res
        .status(404)
        .json({ status: "Fail", message: "Email not found" });
    }

    //Checks if otp exists in the cache
    const otpStatus = otpCache.has(otp)
    if (!otpStatus) {
      return res
        .status(401)
        .json({ status: "Fail", message: "Otp expired" });;
    } 

    const url = record.Merged

    // // Send the OTP to the user's email
    // await transporter.sendMail({
    //   to: record.Email,
    //   subject: "Your OTP Code",
    //   text: `Your OTP code is ${otp}. It is valid for 10 minutes.`,
    // });

    return res.status(200).json({ status: "success", message: `Certificate sent to ${email}` });
  } catch (err) {
    console.error("Handler Error:", err);
    return res
      .status(500)
      .json({ status: "Fail", message: "Internal Server Error" });
  }
};

module.exports={verifyAlumniOtpHandler, validateAlumniDetails}