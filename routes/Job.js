const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');

const UserRole = require('../config/UserRole');
const Auth = require('../middlewares/Auth');
const AllowAccess = require('../middlewares/AllowAccess');

const JobController = require('../controllers/Job');

router.get('/', Auth, asyncHandler(JobController.getJobs));
router.post(
	'/',
	[Auth, AllowAccess([UserRole.recruiter])],
	asyncHandler(JobController.postJob)
);
router.post('/apply/:jobId', Auth, asyncHandler(JobController.applyToJob));
router.delete(
	'/:jobId',
	[Auth, AllowAccess([UserRole.admin, UserRole.recruiter])],
	asyncHandler(JobController.deleteJob)
);

module.exports = router;
