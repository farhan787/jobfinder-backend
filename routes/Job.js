const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');

const JobController = require('../controllers/Job');

router.get('/', asyncHandler(JobController.getAllJobs));
router.post('/:recruiterId', asyncHandler(JobController.postJob));
router.delete('/:jobId', asyncHandler(JobController.deleteJob));

module.exports = router;
