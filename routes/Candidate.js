const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');

const CandidateController = require('../controllers/Candidate');

router.post('/signup', asyncHandler(CandidateController.signup));
router.post('/login', asyncHandler(CandidateController.login));

module.exports = router;
