const Joi = require("joi");

// Ensures email is a valid email format and otp is equal to 6 characters
const otpAuth = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  otp: Joi.string().required().min(6).max(6),
  track: Joi.string()
    .trim()
    .valid(
      "frontend",
      "backend",
      "cybersecurity",
      "product management",
      "ui/ux",
      "data analysis",
    )
    .required(),
}).messages({
  "string.email": "Please enter a valid email address",
  "any.required": "{{#label}} is required",
  "any.only":
    "Track must be one of frontend, backend, cybersecurity, product management, ui/ux and data analysis.",
});

// Ensures email is a valid email format and name is more than 2 letters
const queryInput = Joi.object({
  email: Joi.string().email().optional(),
  name: Joi.string().optional().min(2).max(50),
  track: Joi.string()
    .trim()
    .valid(
      "frontend",
      "backend",
      "cybersecurity",
      "product management",
      "ui/ux",
      "data analysis",
    )
    .required(), 
  cohort: Joi.string().optional(),
})
  .or("email", "name") // at least one of email or name must be provided
  .messages({
    "string.email": "Please enter a valid email address",
    "any.required": "{{#label}} is required",
    "any.only":
      "Track must be one of frontend, backend, cybersecurity, product management, ui/ux and data analysis.",
  });

// Ensures track is valid
const trackInput = Joi.object({
  track: Joi.string()
    .trim()
    .valid(
      "frontend",
      "backend",
      "cybersecurity",
      "product management",
      "ui/ux",
      "data analysis",
    )
    .required(),
}).messages({
  "any.only":
    "Track must be one of frontend, backend, cybersecurity, product management, ui/ux and data analysis.",
});

module.exports = { otpAuth, queryInput, trackInput };
