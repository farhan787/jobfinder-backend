const _ = require('lodash');
const db = require('../models/index');
const AuthValidators = require('../validators/AuthValidators');
const userRoleValidator = require('../validators/RoleValidator');
const EntityExist = require('../helpers/EntityExist');
const AuthHelper = require('../helpers/Auth');
const UserRole = require('../config/UserRole');
const paginationHelper = require('../helpers/PaginationHelper');

const UserModel = db.models.User;
const JobModel = db.models.Job;
const JobApplicationModel = db.models.JobApplication;

module.exports = {
	availableJobs: async (candidateUUID) => {
		const candidate = await EntityExist.userShouldExistByUUID(
			candidateUUID,
			UserRole.candidate
		);

		const jobApplications = await JobApplicationModel.findAll({
			where: { candidate_id: candidate.id },
		});
		const jobApplicationIds = jobApplications.map(
			(application) => application.job_id
		);
		const availableJobs = await JobModel.findAll({
			attributes: ['uuid', 'title', 'description', 'location'],
			where: {
				id: { [db.Sequelize.Op.notIn]: jobApplicationIds },
			},
		});
		return availableJobs;
	},

	deleteCandidate: async (candidateUUID) => {
		let candidate = await EntityExist.userShouldExistByUUID(
			candidateUUID,
			UserRole.candidate
		);

		await db.transaction(async (t) => {
			await JobApplicationModel.destroy({
				where: { candidate_id: candidate.id },
				transaction: t,
			});

			await UserModel.destroy({
				where: { id: candidate.id },
				transaction: t,
			});
		});

		candidate = _.pick(candidate, ['uuid', 'name', 'email', 'phone', 'skills']);
		return candidate;
	},

	getAppliedJobs: async (candidateUUID) => {
		const candidate = await EntityExist.userShouldExistByUUID(
			candidateUUID,
			UserRole.candidate
		);

		let appliedJobApplications = await JobApplicationModel.findAll({
			where: { candidate_id: candidate.id },
		});
		const appliedJobIds = appliedJobApplications.map(
			(application) => application.job_id
		);
		let appliedJobs = await JobModel.findAll({
			where: {
				id: {
					[db.Sequelize.Op.in]: appliedJobIds,
				},
			},
		});
		appliedJobs = _.map(
			appliedJobs,
			_.partialRight(_.pick, ['uuid', 'title', 'description', 'location'])
		);
		return appliedJobs;
	},

	getCandidates: async (paginationData) => {
		const { limit, offset } = paginationHelper(paginationData);

		let candidates = await UserModel.findAll({
			where: { role: UserRole.candidate },
			limit,
			offset,
		});
		candidates = _.map(
			candidates,
			_.partialRight(_.pick, ['uuid', 'name', 'email', 'phone', 'skills'])
		);
		return candidates;
	},

	getJobCandidates: async (jobUUID) => {
		const jobData = await EntityExist.jobShouldExistByUUID(jobUUID);
		const job_id = jobData.id;
		let candidates = await UserModel.findAll({
			include: [{ model: JobApplicationModel, where: { job_id } }],
			where: { role: UserRole.candidate },
		});
		candidates = _.map(
			candidates,
			_.partialRight(_.pick, ['uuid', 'name', 'email', 'phone', 'skills'])
		);
		return candidates;
	},

	signup: async (candidate) => {
		AuthValidators.validateSignupData(candidate);
		userRoleValidator(candidate.role, UserRole.candidate);

		await EntityExist.userShouldNotExist(candidate.email, UserRole.candidate);

		if (candidate.phone) {
			await EntityExist.phoneShouldNotExist(candidate.phone);
		}

		candidate.password = await AuthHelper.hashPassword(candidate.password);
		const savedCandidate = await UserModel.create(candidate);
		return savedCandidate;
	},

	login: async (loginCredentials) => {
		AuthValidators.validateLoginData(loginCredentials);
		const candidate = await EntityExist.userShouldExist(
			loginCredentials.email,
			UserRole.candidate
		);

		await AuthHelper.validatePassword(
			loginCredentials.password,
			candidate.password,
			loginCredentials.email
		);
		const authToken = AuthHelper.generateAuthToken(candidate);
		return authToken;
	},
};
