const express = require('express');
const {  validateAlumniDetails } = require('../controllers/certificateControler');
const router = express.Router();

router.post('/certificate/request', validateAlumniDetails);

module.exports = router;
