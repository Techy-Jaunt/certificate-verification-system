const Joi = require("joi");

// Ensures email is a valid email format and otp is equal to 6 characters
exports.otpAuth = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  otp: Joi.string().required().min(6).max(6),
}).messages({
  "string.email": "Please enter a valid email address",
  "any.required": "{{#label}} is required", 
});