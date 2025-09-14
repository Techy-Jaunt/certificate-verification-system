const express = require('express');
const {  validateAlumniDetails, verifyAlumniOtpHandler } = require('../controllers/certificateControler');
const checkOtpMails = require('../middleware/userMiddleware')
const router = express.Router();

router.post('/certificate/request', validateAlumniDetails);
router.post('/certificate/verify-otp', checkOtpMails, verifyAlumniOtpHandler);

module.exports = router;
