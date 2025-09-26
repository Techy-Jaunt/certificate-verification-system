const axios = require("axios");
const otpGenerator = require("otp-generator");
const otpCache = require("../utils/otpCache");
const { sendEmail } = require("../email/email");
const dotenv = require("dotenv");


// Data URL for fetching spreadsheet data
const BASE_URL =
  "https://script.google.com/macros/s/AKfycbzwlTDLO7SOEIcwo3_CY10ra1374P6C7yS_3d_MttHPtvjbV0AboES6_UXv_aCQC5HO/exec";



const validateAlumniDetails = async (req, res) => {
  try {
    // Destructure the data
    const { email, cohort, track } = req.body;

    if (!email || !cohort || !track) {
      return res
        .status(400)
        .json({
          status: "error",
          message: "Email, cohort, and track are required",
        });
    }

    // Check type of track
    if (typeof track !== "string") {
      return res
        .status(400)
        .json({ status: "error", message: "Track must be a string" });
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
      return res
        .status(400)
        .json({ status: "error", message: "Invalid track provided" });
    }

    // Fetch data from the Google Apps Script
    const response = await axios.get(apiUrl);
    const data = response.data;

    // Ensure records is always an array
    const dataArray = Array.isArray(data) ? data : [data];

    // Find the Alumni record that matches the provided email, cohort
    const record = dataArray.find(
      (item) =>
        item.Email?.toLowerCase() === email.toLowerCase() &&
        String(item.Cohorts) === String(cohort)
    );

    // If no matching record is found, return an error response
    if (!record) {
      return res
        .status(404)
        .json({ status: "error", message: "Alumni Record not found" });
    }

    // If a matching record is found, generate a one-time password (OTP) that expires in 10 minutes
    const otp = otpGenerator.generate(6, {
      upperCase: false,
      specialChars: false,
      lowerCaseAlphabets: false,
    });

    const otpExpiry = Date.now() + 10 * 60 * 1000;

    // Store the OTP in the cache
    otpCache.set(record.Email, { otp, expiry: otpExpiry });

    // Send the OTP to the user's email
    await sendMail({
      to: record.Email,
      subject: "Your OTP Code",
      text: `Your OTP code is ${otp}. It is valid for 10 minutes.`,
    });

    return res.status(200).json({ status: "success", message: "OTP sent" });
  } catch (err) {
    console.error("Validation Error:", err);
    return res
      .status(500)
      .json({ status: "error", message: "Internal Server Error" });
  }
};

//loads the environmental varibles from the env file
dotenv.config();



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
  try {
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
  } catch (error) {
    console.error("Response Error", error);
    throw new CustomError(error.message, 500, "Fail");
  }
};

const queryData = async (url, query, track, type) => {
  try {
    const response = await axios.get(url);
  if (!response) {
    throw new CustomError("Error fetching data from google sheet", 400, "Fail");
  }
  const records = response.data;

  // Ensure records is always an array
  const dataArray = Array.isArray(records) ? records : [records];
 
  let record;
  // Find the Alumni record that matches the provided email
  if (type === "email") {
    record = dataArray.find(
      (item) => item.Email?.toLowerCase() === query.toLowerCase()
    );
  } else if (type === "name") {
    record = dataArray.find(
      (item) => item.Name?.toLowerCase() === query.toLowerCase()
    );}
    else {
      throw new CustomError("Invalid query type, Provide email or name", 404, "Fail");
    }

    // Check if record exist
    if (!record) {
      throw new CustomError(`${type} not found`, 404, "Fail");
    }
    return {
      name: record.Name,
      cohort: record.Cohorts,
      track,
      verified: true,
    };
  
  } catch (error) {
    console.error("Query Error", error);
    throw new CustomError(error.message, 500, "Fail");
  }
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

// Get user details
const getDetailsHandler = async (req, res) => {
  try {
    const { track } = req.validatedTrackData;
    const { email, name } = req.queryData;
    let details;
    if (email) {
      //Fetch frontend data
      if (track === "frontend") {
        //Check if email exists
        details = await queryData(FRONTEND_DATA_URL, email, track, "email");
      }

      //Fetch backend data
      else if (track === "backend") {
        //Check if email exists
        details = await queryData(BACKEND_DATA_URL, email, track, "email");
      }

      //Fetch frontend data
      else if (track === "cybersecurity") {
        //Check if email exists
        details = await queryData(CYBERSECURITY_DATA_URL, email, track, "email");
      }

      //Fetch frontend data
      else if (track === "ui/ux") {
        //Check if email exists
        details = await queryData(UI_UX_DATA_URL, email, track, "email");
      }

      //Fetch product management data
      else if (track === "product management") {
        //Check if email exists
        details = await queryData(PM_DATA_URL, email, track, "email");
      }

      //Fetch data analysis data
      else if (track === "data analysis") {
        //Check if email exists
        details = await queryData(DATA_ANALYSIS_DATA_URL, email, track, "email");
      } else {
        res.status(500).json({ message: "Track does not exist" });
        return;
      }

      return res.status(200).json(details);
    } 
    else if (name) {
      //Fetch frontend data
      if (track === "frontend") {
        //Check if name exists
        details = await queryData(FRONTEND_DATA_URL, name, track, "name");
      }

      //Fetch backend data
      else if (track === "backend") {
        //Check if name exists
        details = await queryData(BACKEND_DATA_URL, name, track, "name");
      }

      //Fetch frontend data
      else if (track === "cybersecurity") {
        //Check if name exists
        details = await queryData(CYBERSECURITY_DATA_URL, name, track, "name");
      }

      //Fetch frontend data
      else if (track === "ui/ux") {
        //Check if name exists
        details = await queryData(UI_UX_DATA_URL, name, track, "name");
      }

      //Fetch product management data
      else if (track === "product management") {
        //Check if name exists
        details = await queryData(PM_DATA_URL, name, track, "name");
      }

      //Fetch data analysis data
      else if (track === "data analysis") {
        //Check if name exists
        details = await queryData(DATA_ANALYSIS_DATA_URL, name, track, "name");
      } else {
        res.status(500).json({ message: "Track does not exist" });
        return;
      }

      return res.status(200).json(details);
    }
  } catch (error) {
    console.error("Details Error", error);
    throw new CustomError(error.message, 500, "Fail");
  }
};

// module.exports = { verifyAlumniOtpHandler, getDetailsHandler };
module.exports = { 
  validateAlumniDetails, 
  verifyAlumniOtpHandler, 
  getDetailsHandler 
};

