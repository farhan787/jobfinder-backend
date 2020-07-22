const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');

const Auth = require('../middlewares/Auth');
const AllowAccess = require('../middlewares/AllowAccess');
const RecruiterController = require('../controllers/Recruiter');
const UserRole = require('../config/UserRole');

router.post('/signup', asyncHandler(RecruiterController.signup));
router.post('/login', asyncHandler(RecruiterController.login));
router.get(
	'/',
	[Auth, AllowAccess([UserRole.admin])],
	asyncHandler(RecruiterController.getRecruiters)
);
router.get(
	'/jobs',
	[Auth, AllowAccess([UserRole.recruiter])],
	asyncHandler(RecruiterController.getPostedJobs)
);
router.delete(
	'/:recruiterId',
	[Auth, AllowAccess([UserRole.admin])],
	asyncHandler(RecruiterController.deleteRecruiter)
);

module.exports = router;
