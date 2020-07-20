const Job = require('../services/Job');
const ResponseCodes = require('../config/ResponseCodes');
const ResponseTransformer = require('../transformers/response');

module.exports = {
	getAllJobs: async (req, res) => {
		const { page, limit } = req.query;
		const jobs = await Job.getJobs({ page, limit });

		const resData = ResponseTransformer.success(ResponseCodes.success, jobs);
		res.status(resData.status).send(resData);
	},

	postJob: async (req, res) => {
		const job = req.body;
		const { recruiterId } = req.params;

		await Job.postJob(job, recruiterId);
		const resData = ResponseTransformer.success(
			ResponseCodes.success,
			{},
			'Job posted successfully'
		);
		res.status(resData.status).send(resData);
	},

	deleteJob: async (req, res) => {
		
	},
};
