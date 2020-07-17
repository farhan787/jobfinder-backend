const express = require('express');
const internalServerError = require('../middlewares/InternalSeverError');

const Admin = require('../routes/Admin');
const Candidate = require('../routes/Candidate');
const Job = require('../routes/Job');
const Recruiter = require('../routes/Recruiter');

module.exports = function (app) {
	app.use(express.json());

	app.use('/api/v1/admin', Admin);
	app.use('/api/v1/candidate', Candidate);
	app.use('/api/v1/job', Job);
	app.use('/api/v1/recruiter', Recruiter);

	app.use(internalServerError);
};
