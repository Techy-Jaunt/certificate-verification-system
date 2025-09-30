const axios = require("axios");
const otpGenerator = require("otp-generator");
const otpCache = require("../utils/otpCache");
const { sendEmail } = require("../email/email");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Validate BASE_URL
if (!process.env.BASE_URL) {
  throw new Error("BASE_URL environment variable is not set");
}

// Track URLs
const TRACK_URLS = {
  frontend: `${process.env.BASE_URL}?track=Frontend`,
  backend: `${process.env.BASE_URL}?track=Backend`,
  "ui/ux": `${process.env.BASE_URL}?track=UI/UX`,
  "product management": `${process.env.BASE_URL}?track=Product Management`,
  cybersecurity: `${process.env.BASE_URL}?track=Cybersecurity`,
  "data analysis": `${process.env.BASE_URL}?track=Data Analysis`,
};

// Helper function to normalize cohort
function normalizeCohort(value) {
  if (!value) return "";
  return value.toString().trim().toLowerCase().replace("cohort", "").trim();
}

// Custom Error class
class CustomError extends Error {
  constructor(message, statusCode, status) {
    super(message);
    this.statusCode = statusCode;
    this.status = status;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

// Helper function to get track URL
function getTrackUrl(track) {
  const normalizedTrack = track.toLowerCase();
  const url = TRACK_URLS[normalizedTrack];
  if (!url) {
    throw new CustomError(`Invalid track: ${track}`, 400, "Fail");
  }
  return url;
}

// Validate alumni details and send OTP
const validateAlumniDetails = async (req, res) => {
  try {
    const { email, cohort, track } = req.body;
    if (!email || !cohort || !track) {
      return res.status(400).json({
        status: "error",
        message: "Email, cohort, and track are required",
      });
    }
    if (typeof track !== "string") {
      return res.status(400).json({
        status: "error",
        message: "Track must be a string",
      });
    }

    const apiUrl = getTrackUrl(track);
    const response = await axios.get(apiUrl, { timeout: 15000 , maxRedirects: 5,});
    const data = response.data;
    const dataArray = Array.isArray(data) ? data : [data];

    const requestCohort = normalizeCohort(cohort);
    const record = dataArray.find(
      (item) =>
        item.Email?.toLowerCase() === email.toLowerCase() &&
        normalizeCohort(item.Cohorts) === requestCohort
    );

    if (!record) {
      return res.status(404).json({
        status: "error",
        message: "Alumni Record not found",
      });
    }

    const otp = otpGenerator.generate(6, {
      upperCase: false,
      specialChars: false,
      lowerCaseAlphabets: false,
    });
    const otpExpiry = Date.now() + 10 * 60 * 1000;
    otpCache.set(record.Email.toLowerCase(), { otp, expiry: otpExpiry });

    await sendEmail({
      to: record.Email,
      subject: "Your OTP Code",
      text: `Your OTP code is ${otp}. It is valid for 10 minutes.`,
    });

    return res.status(200).json({
      status: "success",
      message: "OTP sent",
    });
  } catch (err) {
    console.error("Validation Error:", err);
    return res.status(500).json({
      status: "error",
      message: err.message || "Internal Server Error",
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    });
  }
};

// Helper function to query data
const queryData = async (url, query, type) => {
  try {
    const response = await axios.get(url, { timeout: 5000 });
    if (!response) {
      throw new CustomError("Error fetching data from Google Sheet", 400, "Fail");
    }

    const records = response.data;
    const dataArray = Array.isArray(records) ? records : [records];
    let record;

    if (type === "email") {
      record = dataArray.find(
        (item) => item.Email?.toLowerCase() === query.toLowerCase()
      );
    } else if (type === "name") {
      record = dataArray.find(
        (item) => item.Name?.toLowerCase() === query.toLowerCase()
      );
    } else {
      throw new CustomError("Invalid query type. Provide email or name", 404, "Fail");
    }

    if (!record) {
      throw new CustomError(`${type} not found`, 404, "Fail");
    }

    return {
      name: record.Name,
      cohort: record.Cohorts,
      verified: true,
    };
  } catch (error) {
    console.error("Query Error:", error);
    throw new CustomError(error.message, 500, "Fail");
  }
};

// Helper function to send certificate link
const responseData = async (url, email, otp, track) => {
  try {
    const response = await axios.get(url, { timeout: 5000 });
    if (!response) {
      throw new CustomError("Error fetching data from Google Sheet", 400, "Fail");
    }

    const records = response.data;
    const dataArray = Array.isArray(records) ? records : [records];
    const record = dataArray.find(
      (item) => item.Email?.toLowerCase() === email.toLowerCase()
    );

    if (!record) {
      throw new CustomError("Email not found", 404, "Fail");
    }

    const cachedOtp = otpCache.get(email.toLowerCase());
    if (!cachedOtp || cachedOtp.otp !== otp || Date.now() > cachedOtp.expiry) {
      throw new CustomError("OTP expired or invalid", 401, "Fail");
    }

    const key = `Link to merged Doc - ${track.toLowerCase()} cert`;
    const link = record[key];

    await sendEmail({
      to: email,
      subject: "Your certificate link",
      html: `<p>Hello,</p><p>Your certificate link is: <strong>${link}</strong>.</p><p>Thank you,<br><strong>TechyJaunt</strong></p>`,
    });
  } catch (error) {
    console.error("Response Error:", error);
    throw new CustomError(error.message, 500, "Fail");
  }
};

// Verify OTP and send certificate link
const verifyAlumniOtpHandler = async (req, res) => {
  try {
    const { email, otp, track } = req.validatedOtpData;
    const normalizedTrack = track.toLowerCase();
    const url = getTrackUrl(normalizedTrack);

    await responseData(url, email, otp, normalizedTrack);

    return res.status(200).json({
      status: "success",
      message: `Certificate link sent to ${email}`,
    });
  } catch (err) {
    console.error("Handler Error:", err);
    return res.status(500).json({
      status: "error",
      message: err.message || "Internal Server Error",
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    });
  }
};

// Get user details
const getDetailsHandler = async (req, res) => {
  try {
    const { track } = req.validatedTrackData;
    const { email, name } = req.queryData;
    const normalizedTrack = track.toLowerCase();
    const url = getTrackUrl(normalizedTrack);

    let details;
    if (email) {
      details = await queryData(url, email, "email");
    } else if (name) {
      details = await queryData(url, name, "name");
    } else {
      return res.status(400).json({
        status: "error",
        message: "Email or name is required",
      });
    }

    return res.status(200).json({
      ...details,
      track: normalizedTrack,
    });
  } catch (error) {
    console.error("Details Error:", error);
    return res.status(500).json({
      status: "error",
      message: error.message || "Something went wrong while fetching details",
      ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
    });
  }
};

module.exports = {
  validateAlumniDetails,
  verifyAlumniOtpHandler,
  getDetailsHandler,
};
