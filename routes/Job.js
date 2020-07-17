const express = require('express');
const router = express.Router();

const JobController = require('../controllers/Job');

router.post('/:recruiterId', JobController.postJob);

module.exports = router;
