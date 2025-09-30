const {otpAuth, queryInput, trackInput} = require('../utils/inputValidation')

// Function to handle validation errors
const errorHandler = (error) => {
  return error.details.reduce((acc, curr) => {
    acc[curr.path[0]] = curr.message;

    return acc;
  }, {});
}

// OTP Validation Middleware
const checkOtpMails = (req, res, next) => {
  try {
    const { error, value } = otpAuth.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      const message = errorHandler(error);
      return res.status(400).json(message);
    }
    req.validatedOtpData = value;
    next();
  } catch (error) {
    // console.log("Middleware Err", error)
    return res.status(500).json({ message: error.message })
  }
};

// Query Middleware
const checkQueryInputs = (req, res, next) => {
  try {
    const { error, value } = queryInput.validate(req.query, { // Pass the entire query object
      abortEarly: false,
    });
    if (error) {
      const message = errorHandler(error);
      return res.status(400).json(message);
    }
    req.queryData = value;
    next();
  } catch (error) {
    // console.log("Query Middleware Err", error);
    return res.status(500).json({ message: error.message });
  }
};

// Track Validation Middleware
const trackInputValidation = (req, res, next) => {
  try {
    const { error, value } = trackInput.validate(
      { track: req.query.track },   // 👈 only validate track
      { abortEarly: false }
    );

    if (error) {
      const message = errorHandler(error);
      return res.status(400).json(message);
    }
    req.validatedTrackData = value;
    next();
  } catch (error) {
    // console.log("Track Middleware Err", error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {checkOtpMails, checkQueryInputs, trackInputValidation}