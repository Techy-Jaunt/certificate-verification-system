const express = require('express');
const { verifyAlumniOtpHandler } = require('../controllers/certificateControler');
const checkOtpMails = require('../middleware/userMiddleware')
const router = express.Router();

router.post('/certificate/verify-otp', checkOtpMails, verifyAlumniOtpHandler);

module.exports = router;
