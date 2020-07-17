const express = require('express');
const router = express.Router();

const RecruiterController = require('../controllers/Recruiter');

router.post('/signup', RecruiterController.signup);

module.exports = router;
