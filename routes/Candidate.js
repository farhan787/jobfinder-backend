const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');

const Auth = require('../middlewares/Auth');
const AdminAuth = require('../middlewares/Admin');
const CandidateAuth = require('../middlewares/Candidate');
const RecruiterAuth = require('../middlewares/Recruiter');
const CandidateController = require('../controllers/Candidate');

router.post('/signup', asyncHandler(CandidateController.signup));
router.post('/login', asyncHandler(CandidateController.login));
router.get(
	'/:jobId',
	[Auth, RecruiterAuth],
	asyncHandler(CandidateController.getJobCandidates)
);
router.get(
	'/',
	[Auth, AdminAuth],
	asyncHandler(CandidateController.getCandidates)
);
router.get(
	'/applied/jobs',
	[Auth, CandidateAuth],
	asyncHandler(CandidateController.getAppliedJobs)
);
router.delete(
	'/:candidateId',
	[Auth, AdminAuth],
	asyncHandler(CandidateController.deleteCandidate)
);

module.exports = router;
