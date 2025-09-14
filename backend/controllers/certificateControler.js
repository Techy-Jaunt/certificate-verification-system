const axios = require('axios');
const transporter = require('../email/email');
const otpGenerator = require('otp-generator');
const otpCache = require('../utils/otpCache');


// Data URL for fetching spreadsheet data
const BASE_URL = "https://script.google.com/macros/s/AKfycbzwlTDLO7SOEIcwo3_CY10ra1374P6C7yS_3d_MttHPtvjbV0AboES6_UXv_aCQC5HO/exec";

exports.validateAlumniDetails = async (req, res) => {

    try {
        // Destructure the data
        const { email, cohort, track } = req.body;

        if (!email || !cohort || !track) {
            return res.status(400).json({ status: 'error', message: 'Email, cohort, and track are required' });
        }

        // Check type of track
        if (typeof track !== 'string') {
            return res.status(400).json({ status: 'error', message: 'Track must be a string' });
        }

        // set apiUrl based on track
        let apiUrl = "";

        // Determine the correct API URL based on the track
        if (track.toLowerCase() === "frontend") {
            apiUrl = `${BASE_URL}?track=Frontend`;
        } else if (track.toLowerCase() === "backend") {
            apiUrl = `${BASE_URL}?track=Backend`;
        } else if (track.toLowerCase() === "ui/ux") {
            apiUrl = `${BASE_URL}?track=UI/UX`;
        } else if (track.toLowerCase() === "product management") {
            apiUrl = `${BASE_URL}?track=Product Management`;
        } else if (track.toLowerCase() === "cybersecurity") {
            apiUrl = `${BASE_URL}?track=Cybersecurity`;
        } else if (track.toLowerCase() === "data analysis") {
            apiUrl = `${BASE_URL}?track=Data Analysis`;
        } else {
            return res.status(400).json({ status: 'error', message: 'Invalid track provided' });
        }

        // Fetch data from the Google Apps Script
        const response = await axios.get(apiUrl);
        const data = response.data;

        // Ensure records is always an array
        const dataArray = Array.isArray(data) ? data : [data];

        // Find the Alumni record that matches the provided email, cohort
        const record = dataArray.find(item =>
            item.Email?.toLowerCase() === email.toLowerCase() && String(item.Cohorts) === String(cohort));

        // If no matching record is found, return an error response
        if (!record) {
            return res.status(404).json({ status: 'error', message: 'Alumni Record not found' });
        }

        // If a matching record is found, generate a one-time password (OTP) that expires in 10 minutes
        const otp = otpGenerator.generate(6, { 
            upperCase: false, 
            specialChars: false, 
            lowerCaseAlphabets: false 
        });

        const otpExpiry = Date.now() + 10 * 60 * 1000;

        // Store the OTP in the cache
        otpCache.set(record.Email, { otp, expiry: otpExpiry });

        // Send the OTP to the user's email
        await transporter.sendMail({
            to: record.Email,
            subject: 'Your OTP Code',
            text: `Your OTP code is ${otp}. It is valid for 10 minutes.`,
        });

        return res.status(200).json({ status: 'success', apiUrl, message: 'OTP sent' });
    } catch (err) {
        console.error("Validation Error:", err);
        return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};


