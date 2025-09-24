
const express = require('express');
const {  validateAlumniDetails,  verifyAlumniOtpHandler, getDetailsHandler} = require('../controllers/certificateController.js');
const {checkOtpMails, checkQueryInputs, trackInputValidation} = require('../middleware/userMiddleware.js')

const router = express.Router();

router.post('/certificate/request', validateAlumniDetails);
router.post('/certificate/verify-otp', checkOtpMails, verifyAlumniOtpHandler);
router.get('/certificate/verify', trackInputValidation, checkQueryInputs, getDetailsHandler);

module.exports = router;
