const db = require('../models/index');
const JobModel = db.models.Job;

module.exports = {
	async postJob(job, recruiterId) {
		try {
			job.recruiter_id = recruiterId;
			await JobModel.create(job);
		} catch (err) {
			console.log(err);
		}
	},
};
