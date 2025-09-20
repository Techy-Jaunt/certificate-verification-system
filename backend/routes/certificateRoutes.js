const express = require('express');
const { verifyAlumniOtpHandler, getDetailsHandler } = require('../controllers/certificateControler');
const {checkOtpMails, checkQueryInputs, trackInputValidation} = require('../middleware/userMiddleware')
const router = express.Router();

router.post('/certificate/verify-otp', checkOtpMails, verifyAlumniOtpHandler);
router.get('/certificate/verify', trackInputValidation, checkQueryInputs, getDetailsHandler);

module.exports = router;
