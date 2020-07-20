const db = require('../models/index');
const paginationHelper = require('../helpers/PaginationHelper');
const ApplicationError = require('../errors/ApplicationError');
const ResponseCodes = require('../config/ResponseCodes');
const JobValidators = require('../validators/JobValidators');

const JobModel = db.models.Job;

module.exports = {
	postJob: async (job, recruiterId) => {
		try {
			job.recruiter_id = recruiterId;
			JobValidators.jobPostData(job);

			await JobModel.create(job);
		} catch (err) {
			throw new ApplicationError(
				err.message,
				err.status || ResponseCodes.internalServerError
			);
		}
	},

	getJobs: async (paginationData) => {
		try {
			const { limit, offset } = paginationHelper(paginationData);
			const jobs = await JobModel.findAll({ limit, offset });
			return jobs;
		} catch (err) {
			throw new ApplicationError(err, ResponseCodes.internalServerError);
		}
	},

	deleteJob: async () => {},
};
