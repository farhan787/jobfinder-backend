const _ = require('lodash');

const db = require('../models/index');
const JobValidators = require('../validators/JobValidators');
const EntityExist = require('../helpers/EntityExist');
const paginationHelper = require('../helpers/PaginationHelper');
const UserRole = require('../config/UserRole');
const { mailCandidateAndRecruiter } = require('./Email');

const UserModel = db.models.User;
const JobModel = db.models.Job;
const JobApplication = db.models.JobApplication;

module.exports = {
	applyToJob: async (jobUUID, candidate) => {
		const candidateData = await EntityExist.userShouldExistByUUID(
			candidate.uuid,
			candidate.role
		);
		const jobData = await EntityExist.jobShouldExistByUUID(jobUUID);

		const application = {
			job_id: jobData.id,
			candidate_id: candidateData.id,
		};
		await EntityExist.jobApplicationShouldNotExist(
			jobData.id,
			candidateData.id
		);
		await JobApplication.create(application);

		const recruiterData = await UserModel.findOne({
			where: {
				id: jobData.recruiter_id,
				role: UserRole.recruiter,
			},
		});
		await mailCandidateAndRecruiter(candidateData, recruiterData, jobData);
	},

	deleteJob: async (jobUUID, user) => {
		if (user.role == UserRole.admin) {
			const admin = await EntityExist.userShouldExistByUUID(
				user.uuid,
				UserRole.admin
			);

			let job = await EntityExist.jobShouldExistByUUID(jobUUID);
			await db.transaction(async (t) => {
				await JobApplication.destroy({
					where: { job_id: job.id },
					transaction: t,
				});

				await JobModel.destroy({
					where: { id: job.id },
					transaction: t,
				});
			});
			job = _.pick(job, ['uuid', 'title', 'description', 'location']);
			return job;
		}

		const recruiter = await EntityExist.userShouldExistByUUID(
			user.uuid,
			UserRole.recruiter
		);
		let job = await EntityExist.jobShouldBelongToRecruiter(
			jobUUID,
			recruiter.id
		);

		await db.transaction(async (t) => {
			await JobApplication.destroy({
				where: { job_id: job.id },
				transaction: t,
			});

			await JobModel.destroy({
				where: { id: job.id },
				transaction: t,
			});
		});

		job = _.pick(job, ['uuid', 'title', 'description', 'location']);
		return job;
	},

	getAllJobs: async (paginationData) => {
		const { limit, offset } = paginationHelper(paginationData);

		let jobs = await JobModel.findAll({
			limit,
			offset,
			order: [
				['createdAt', 'DESC']
			]
		});
		jobs = _.map(
			jobs,
			_.partialRight(_.pick, ['uuid', 'title', 'description', 'location'])
		);
		return jobs;
	},

	postJob: async (job, recruiter) => {
		const recruiterData = await EntityExist.userShouldExistByUUID(
			recruiter.uuid,
			recruiter.role
		);
		job.recruiter_id = recruiterData.id;

		JobValidators.jobPostData(job);

		await EntityExist.jobShouldNotExist(job);
		const savedJob = await JobModel.create(job);
		return savedJob;
	},
};
