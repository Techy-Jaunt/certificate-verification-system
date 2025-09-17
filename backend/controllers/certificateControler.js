const axios = require("axios");
const otpGenerator = require("otp-generator");
const otpCache = require("../utils/otpCache");
const { sendEmail } = require("../email/email");
const dotenv = require("dotenv");

//loads the environmental varibles from the env file
dotenv.config();

// Data URL for fetching spreadsheet data
const FRONTEND_DATA_URL = process.env.FRONTEND_DATA_URL;

const BACKEND_DATA_URL = process.env.BACKEND_DATA_URL;

const UI_UX_DATA_URL = process.env.UI_UX_DATA_URL;

const PM_DATA_URL = process.env.PM_DATA_URL;

const CYBERSECURITY_DATA_URL = process.env.CYBERSECURITY_DATA_URL;

const DATA_ANALYSIS_DATA_URL = process.env.DATA_ANALYSIS_DATA_URL;


//Custom Error
class CustomError extends Error {
  constructor(message, statusCode, status) {
    super(message);

    this.statusCode = statusCode;
    this.status = status;
    this.isOperational = true;

    // Capture the stack trace (optional, for debugging)
    Error.captureStackTrace(this, this.constructor);
  }
}

// Response helper function
const responseData = async (url, email, otp, track) => {
  const response = await axios.get(url);
  if (!response) {
    throw new CustomError("Error fetching data from google sheet", 400, "Fail");
  }
  const records = response.data;

  // Ensure records is always an array
  const dataArray = Array.isArray(records) ? records : [records];

  // Find the Alumni record that matches the provided email

  const record = dataArray.find(
    (item) => item.Email?.toLowerCase() === email.toLowerCase()
  );

  // Check if email exist
  if (!record) {
    throw new CustomError("Email not found", 404, "Fail");
  }

  //Checks if otp exists in the cache
  const cachedOtp = otpCache.get(email.toLowerCase());
  if (
    !cachedOtp || // nothing stored
    cachedOtp.otp !== otp || // code mismatch
    Date.now() > cachedOtp.expiry // expired
  ) {
    throw new CustomError("Otp expired or invalid", 401, "Fail");
  }

  const link = record[`Link to merged Doc - ${track} cert`];
  console.log("LINK", link);

  // Send the OTP to the user's email

  await sendEmail({
    to: email,
    subject: "Your certificate link",
    html: `<p>Hello,</p><p>Your certificate link is: <strong>${link}</strong>.</p><p>Thank you,<br><strong>TechyJuant</strong></p>`,
  });
};

// Verify Otp
const verifyAlumniOtpHandler = async (req, res) => {
  try {
    let { email, otp, track } = req.validatedOtpData;

    track = track.toLowerCase();

    //Fetch frontend data
    if (track === "frontend") {
      //Check if email exists
      await responseData(FRONTEND_DATA_URL, email, otp, track);
    }

    //Fetch backend data
    else if (track === "backend") {
      //Check if email exists
      await responseData(BACKEND_DATA_URL, email, otp, track);
    }

    //Fetch frontend data
    else if (track === "cybersecurity") {
      //Check if email exists
      await responseData(CYBERSECURITY_DATA_URL, email, otp, track);
    }

    //Fetch frontend data
    else if (track === "ui/ux") {
      //Check if email exists
      await responseData(UI_UX_DATA_URL, email, otp, track);
    }

    //Fetch product management data
    else if (track === "product management") {
      //Check if email exists
      await responseData(PM_DATA_URL, email, otp, track);
    }

    //Fetch data analysis data
    else if (track === "data analysis") {
      //Check if email exists
      await responseData(DATA_ANALYSIS_DATA_URL, email, otp, track);
    } else {
      res.status(404).json({ message: "Track does not exist" });
      return;
    }

    return res.status(200).json({
      status: "success",
      message: `Certificate link sent to ${email}`,
    });
  } catch (err) {
    console.error("Handler Error:", err);
    throw new CustomError(err.message, 500, "Fail");
  }
};

module.exports = { verifyAlumniOtpHandler };
