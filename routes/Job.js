const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');

const Auth = require('../middlewares/Auth');
const Admin = require('../middlewares/Admin');
const RecruiterAuth = require('../middlewares/Recruiter');

const JobController = require('../controllers/Job');

router.get('/', Auth, asyncHandler(JobController.getJobs));
router.post('/', [Auth, RecruiterAuth], asyncHandler(JobController.postJob));
router.post('/apply/:jobId', Auth, asyncHandler(JobController.applyToJob));
router.delete('/:jobId', [Auth, Admin], asyncHandler(JobController.deleteJob));

module.exports = router;
