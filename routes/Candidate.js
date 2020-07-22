const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');

const UserRole = require('../config/UserRole');
const Auth = require('../middlewares/Auth');
const AllowAccess = require('../middlewares/AllowAccess');
const CandidateController = require('../controllers/Candidate');

router.get(
	'/',
	[Auth, AllowAccess([UserRole.admin])],
	asyncHandler(CandidateController.getCandidates)
);
router.post('/signup', asyncHandler(CandidateController.signup));
router.post('/login', asyncHandler(CandidateController.login));

router.get(
	'/jobs',
	[Auth, AllowAccess([UserRole.candidate])],
	asyncHandler(CandidateController.availableJobs)
);

router.get(
	'/:jobId',
	[Auth, AllowAccess([UserRole.recruiter])],
	asyncHandler(CandidateController.getJobCandidates)
);

router.get(
	'/applied/jobs',
	[Auth, AllowAccess([UserRole.candidate])],
	asyncHandler(CandidateController.getAppliedJobs)
);

router.delete(
	'/:candidateId',
	[Auth, AllowAccess([UserRole.admin])],
	asyncHandler(CandidateController.deleteCandidate)
);

module.exports = router;
