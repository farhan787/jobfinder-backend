const _ = require('lodash');

const Job = require('../services/Job');
const ResponseCodes = require('../config/ResponseCodes');
const ResponseTransformer = require('../transformers/response');

module.exports = {
	applyToJob: async (req, res) => {
		const { jobId } = req.params;
		const candidate = req.user;

		await Job.applyToJob(jobId, candidate);
		const resData = ResponseTransformer.success(
			ResponseCodes.success,
			{
				jobId,
				candidate,
			},
			'Applied to job successfully'
		);
		res.status(resData.code).send(resData);
	},

	deleteJob: async (req, res) => {
		const { jobId } = req.params;
		const job = await Job.deleteJob(jobId);
		const resData = ResponseTransformer.success(
			ResponseCodes.success,
			job,
			'Job successfully deleted'
		);
		res.status(resData.code).send(resData);
	},

	getJobs: async (req, res) => {
		const { page, limit } = req.query;

		const jobs = await Job.getAllJobs({ page, limit });
		const resData = ResponseTransformer.success(ResponseCodes.success, jobs);
		res.status(resData.code).send(resData);
	},

	postJob: async (req, res) => {
		const job = req.body;
		const recruiter = req.user;

		const savedJob = await Job.postJob(job, recruiter);
		const resData = ResponseTransformer.success(
			ResponseCodes.success,
			{
				job: _.pick(savedJob, ['uuid', 'title', 'description', 'location']),
				recruiter,
			},
			'Job posted successfully'
		);
		res.status(resData.code).send(resData);
	},
};
