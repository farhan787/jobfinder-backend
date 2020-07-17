const express = require('express');
const router = express.Router();

const CandidateController = require('../controllers/Candidate');

router.post('/signup', CandidateController.signup);

module.exports = router;
