const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');

const Auth = require('../middlewares/Auth');
const Admin = require('../middlewares/Admin');
const RecruiterController = require('../controllers/Recruiter');

router.post('/signup', asyncHandler(RecruiterController.signup));
router.post('/login', asyncHandler(RecruiterController.login));
router.get('/', [Auth, Admin], asyncHandler(RecruiterController.getRecruiters));
router.delete(
	'/:recruiterId',
	[Auth, Admin],
	asyncHandler(RecruiterController.deleteRecruiter)
);

module.exports = router;
