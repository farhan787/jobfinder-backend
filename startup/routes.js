const express = require('express');
const Admin = require('../routes/Admin');
const Candidate = require('../routes/Candidate');
const Job = require('../routes/Job');
const Recruiter = require('../routes/Recruiter');
const ResponseCodes = require('../config/ResponseCodes');

module.exports = function (app) {
	app.use(express.json());

	app.use('/api/v1/admins', Admin);
	app.use('/api/v1/candidates', Candidate);
	app.use('/api/v1/jobs', Job);
	app.use('/api/v1/recruiters', Recruiter);

	app.use('/*', (req, res) => {
		res.status(ResponseCodes.notFound).send({
			success: false,
			code: 404,
			errors: {
				message: 'Not Found',
			},
		});
	});
};
