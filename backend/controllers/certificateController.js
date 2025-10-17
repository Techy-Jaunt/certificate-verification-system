const axios = require("axios");
const otpGenerator = require("otp-generator");
const otpCache = require("../utils/otpCache");
const { sendEmail } = require("../email/email");
const dotenv = require("dotenv");

dotenv.config();

// Base Google Sheet URL
const BASE_URL =
  "https://script.google.com/macros/s/AKfycbzwlTDLO7SOEIcwo3_CY10ra1374P6C7yS_3d_MttHPtvjbV0AboES6_UXv_aCQC5HO/exec";

const TRACK_URLS = {
  frontend: `${BASE_URL}?track=Frontend`,
  backend: `${BASE_URL}?track=Backend`,
  cybersecurity: `${BASE_URL}?track=Cybersecurity`,
  "ui/ux": `${BASE_URL}?track=UI/UX`,
  "product management": `${BASE_URL}?track=ProductManagement`,
  "data analysis": `${BASE_URL}?track=DataAnalysis`,
};

function normalizeCohort(value) {
  if (!value) return "";
  return value.toString().trim().toLowerCase().replace("cohort", "").trim();
}

class CustomError extends Error {
  constructor(message, statusCode = 500, status = "error") {
    super(message);
    this.statusCode = statusCode;
    this.status = status;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

const validateAlumniDetails = async (req, res) => {
  try {
    // Destructure the data
    const { email, cohort, track } = req.body;

    if (!email || !cohort || !track) {
      return res.status(400).json({ status: "error", message: "Email, cohort, and track are required" });
    }

    // Check type of track
    if (typeof track !== "string") {
      return res.status(400).json({ status: "error", message: "Track must be a string" });
    }

    const apiUrl = TRACK_URLS[track.toLowerCase()];
    if (!apiUrl) return res.status(400).json({ status: "error", message: "Invalid track provided" });

    const { data } = await axios.get(apiUrl);
    const dataArray = Array.isArray(data) ? data : [data];
    
    console.log("First recpprd sample: ", dataArray[0])

    const record = dataArray.find(
      (item) =>
        item.Email?.toLowerCase() === email.toLowerCase() &&
        normalizeCohort(item.Cohorts) === normalizeCohort(cohort)
    );

    if (!record) throw new CustomError("Alumni Record not found", 404, "fail");

    const otp = otpGenerator.generate(6, { upperCase: false, specialChars: false, lowerCaseAlphabets: false });
    otpCache.set(record.Email, { otp, expiry: Date.now() + 10 * 60 * 1000 });

    // Send the OTP to the user's email
    await sendEmail({
      to: record.Email,
      subject: "Your OTP Code",
      text: `Your OTP code is ${otp}. It is valid for 10 minutes.`,
    });

    return res.status(200).json({ status: "success", message: "OTP sent" });
  } catch (err) {
    console.error("Validation Error:", err);
    return res.status(err.statusCode || 500).json({
      status: err.status || "error",
      message: err.message || "Internal Server Error",
    });
  }
};

const responseData = async (url, email, otp, track) => {
  try {
    const { data } = await axios.get(url);
    const dataArray = Array.isArray(data) ? data : [data];
    
    console.log("🔍 Full data received:", dataArray);
    console.log("🔍 First record keys:", Object.keys(dataArray[0] || {}));
    console.log("🔍 Looking for email:", email.toLowerCase());

    const record = dataArray.find((item) => item.Email?.toLowerCase() === email.toLowerCase());
    if (!record) throw new CustomError("Email not found", 404, "fail");

    console.log("🔍 Found record:", record);
    console.log("🔍 All record keys:", Object.keys(record));

    const cachedOtp = otpCache.get(email.toLowerCase());
    if (!cachedOtp || cachedOtp.otp !== otp || Date.now() > cachedOtp.expiry) {
      throw new CustomError("OTP expired or invalid", 401, "fail");
    }

    const key = `Link to merged Doc - ${track.toLowerCase()} cert`;
    console.log("🔍 Looking for key:", key);
    console.log("🔍 Available keys:", Object.keys(record));
    
    const link = record[key];
    if (!link) throw new CustomError("Certificate link not found", 404, "fail");

    await sendEmail({
      to: email,
      subject: "Your certificate link",
      html: `<p>Hello,</p><p>Your certificate link is: <strong>${link}</strong>.</p><p>Thank you,<br><strong>TechyJaunt</strong></p>`,
    });
  } catch (err) {
    if (err instanceof CustomError) {
        throw err;
    }
    console.error("Response Data Internal Error:", err);
    throw new CustomError("Failed to process certificate request.", 500, "error");
  }
};


const queryData = async (res, url, query, track, type) => {
  try {
    const { data } = await axios.get(url);
    const dataArray = Array.isArray(data) ? data : [data];

    let record;
    if (type === "email") {
      record = dataArray.find((item) => item.Email?.toLowerCase() === query.toLowerCase());
    } else if (type === "name") {
      record = dataArray.find((item) => item.Name?.toLowerCase() === query.toLowerCase());
    } else {
      throw new CustomError("Invalid query type, provide email or name", 400, "fail");
    }

    if (!record) throw new CustomError(`${type} not found`, 404, "fail");

    return { name: record.Name, cohort: record.Cohorts, track, verified: true };
  } catch (err) {
    console.error("Query Error:", err);
    return res.status(err.statusCode || 500).json({
      status: err.status || "error",
      message: err.message || "Internal Server Error",
    });
  }
};

// Verify Otp
const verifyAlumniOtpHandler = async (req, res) => {
  try {
    let { email, otp, track } = req.validatedOtpData;
    console.log("🔍 Verifying OTP for:", { email, track, otp });
    
    const apiUrl = TRACK_URLS[track.toLowerCase()];
    if (!apiUrl) throw new CustomError("Track does not exist", 404, "fail");

    // Corrected call: Pass only logic-required arguments, not 'res'
    await responseData(apiUrl, email, otp, track);

    // This is the ONLY success response, sent after the promise resolves
    return res.status(200).json({
      status: "success",
      message: `Certificate link sent to ${email}`,
    });
  } catch (err) {
    // This catch block handles ALL errors thrown from above, including responseData
    console.error("Handler Error:", err);
    return res.status(err.statusCode || 500).json({
      status: err.status || "error",
      message: err.message || "Internal Server Error",
    });
  }
};


// Get user details
const getDetailsHandler = async (req, res) => {
  try {
    const { track } = req.validatedTrackData;
    const { email, name } = req.queryData;
    const apiUrl = TRACK_URLS[track.toLowerCase()];

    if (!apiUrl) throw new CustomError("Track does not exist", 404, "fail");

    const queryType = email ? "email" : name ? "name" : null;
    if (!queryType) throw new CustomError("Provide a query (email or name)", 400, "fail");

    const details = await queryData(res, apiUrl, email || name, track, queryType);

    return res.status(200).json(details);
  } catch (err) {
    console.error("Details Error:", err);
    return res.status(err.statusCode || 500).json({
      status: err.status || "error",
      message: err.message || "Internal Server Error",
    });
  }
};

module.exports = {
  validateAlumniDetails,
  verifyAlumniOtpHandler,
  getDetailsHandler,
};
