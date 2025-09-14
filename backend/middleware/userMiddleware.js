const otpInput = require('../utils/inputValidation')

// Function to handle validation errors
const errorHandler = (error) => {
  return error.details.reduce((acc, curr) => {
    acc[curr.path[0]] = curr.message;

    return acc;
  }, {});
}

// ✅ OTP Validation Middleware
const checkOtpMails = (req, res, next) => {
  try {
    const { error, value } = otpInput.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      const message = errorHandler(error);
      return res.status(400).json(message);
    }
    req.validatedOtpData = value;
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
};

module.exports = checkOtpMails