const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');

const Auth = require('../middlewares/Auth');
const AdminAuth = require('../middlewares/Admin');
const RecruiterAuth = require('../middlewares/Recruiter');
const RecruiterController = require('../controllers/Recruiter');

router.post('/signup', asyncHandler(RecruiterController.signup));
router.post('/login', asyncHandler(RecruiterController.login));
router.get(
	'/',
	[Auth, AdminAuth],
	asyncHandler(RecruiterController.getRecruiters)
);
router.get(
	'/jobs',
	[Auth, RecruiterAuth],
	asyncHandler(RecruiterController.getPostedJobs)
);
router.delete(
	'/:recruiterId',
	[Auth, AdminAuth],
	asyncHandler(RecruiterController.deleteRecruiter)
);

module.exports = router;
