const ApplicationError = require('../errors/ApplicationError');
const Errors = require('../errors/Errors');

const db = require('../models/index');
const UserModel = db.models.User;
const JobModel = db.models.Job;
const JobApplicationModel = db.models.JobApplication;

module.exports = {
	userShouldExist: async (email, role) => {
		const user = await UserModel.findOne({
			where: { email, role },
		});
		if (!user) {
			throw new ApplicationError(
				Errors.unauthorized('invalid credentials').message,
				Errors.unauthorized().status
			);
		}

		return user;
	},

	userShouldNotExist: async (email, role) => {
		const user = await UserModel.findOne({
			where: { email, role },
		});
		if (user) {
			throw new ApplicationError(
				Errors.duplicateError(email).message,
				Errors.duplicateError(email).status
			);
		}
	},

	userShouldExistByUUID: async (uuid, role) => {
		const user = await UserModel.findOne({
			where: { uuid, role },
		});
		if (!user) {
			throw new ApplicationError(
				Errors.unauthorized('invalid credentials').message,
				Errors.unauthorized().status
			);
		}
		return user;
	},

	jobApplicationShouldNotExist: async (jobId, candidateId) => {
		const jobApplication = await JobApplicationModel.findOne({
			where: { job_id: jobId, candidate_id: candidateId },
		});

		if (jobApplication) {
			throw new ApplicationError(
				Errors.forbidden('already applied for the job').message,
				Errors.forbidden().status
			);
		}
	},

	jobShouldExistByUUID: async (uuid) => {
		const job = await JobModel.findOne({
			where: { uuid },
		});
		if (!job) {
			throw new ApplicationError(
				Errors.notExist(uuid).message,
				Errors.notExist(uuid).status
			);
		}
		return job;
	},

	jobShouldBelongToRecruiter: async (jobUUID, recruiterId) => {
		const job = await JobModel.findOne({
			where: { uuid: jobUUID },
		});
		if (!job) {
			throw new ApplicationError(
				Errors.notExist(jobUUID).message,
				Errors.notExist(jobUUID).status
			);
		}

		if (job.recruiter_id !== recruiterId) {
			throw new ApplicationError(
				Errors.accessDenied().message,
				Errors.accessDenied().status
			);
		}
		return job;
	},

	jobShouldNotExist: async (jobData) => {
		const job = await JobModel.findOne({
			where: { title: jobData.title, recruiter_id: jobData.recruiter_id },
		});

		if (job) {
			throw new ApplicationError(
				Errors.duplicateError('job').message,
				Errors.duplicateError().status
			);
		}
	},
};
