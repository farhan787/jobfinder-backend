const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');

const Auth = require('../middlewares/Auth');
const JobController = require('../controllers/Job');

router.get('/', asyncHandler(JobController.getJobs));
router.post('/', Auth, asyncHandler(JobController.postJob));
router.post('/apply/:jobId', Auth, asyncHandler(JobController.applyToJob));
router.delete('/:jobId', asyncHandler(JobController.deleteJob));

module.exports = router;
