const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');

const RecruiterController = require('../controllers/Recruiter');

router.post('/signup', asyncHandler(RecruiterController.signup));
router.post('/login', asyncHandler(RecruiterController.login));
router.get('/', asyncHandler(RecruiterController.getRecruiters));

module.exports = router;
