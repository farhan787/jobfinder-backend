const _ = require('lodash');
const db = require('../models/index');
const AuthValidators = require('../validators/AuthValidators');
const userRoleValidator = require('../validators/RoleValidator');
const EntityExist = require('../helpers/EntityExist');
const AuthHelper = require('../helpers/Auth');
const UserRole = require('../config/UserRole');

const UserModel = db.models.User;
const JobApplicationModel = db.models.JobApplication;

module.exports = {
	deleteCandidate: async (candidateUUID) => {
		let candidate = await EntityExist.userShouldExistByUUID(
			candidateUUID,
			UserRole.candidate
		);
		UserModel.destroy({
			where: { id: candidate.id, role: UserRole.candidate },
		});

		candidate = _.pick(candidate, ['uuid', 'name', 'email', 'phone', 'skills']);
		return candidate;
	},

	getCandidates: async () => {
		let candidates = await UserModel.findAll({
			where: { role: UserRole.candidate },
		});
		candidates = _.map(
			candidates,
			_.partialRight(_.pick, ['name', 'email', 'phone', 'skills'])
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
			_.partialRight(_.pick, ['name', 'email', 'phone', 'skills'])
		);
		return candidates;
	},

	signup: async (candidate) => {
		AuthValidators.validateSignupData(candidate);
		userRoleValidator(candidate.role, UserRole.candidate);

		await EntityExist.userShouldNotExist(candidate.email, UserRole.candidate);

		candidate.password = await AuthHelper.hashPassword(candidate.password);
		await UserModel.create(candidate);
	},

	login: async (loginCredentials) => {
		AuthValidators.validateLoginData(loginCredentials);
		const candidate = await EntityExist.userShouldExist(
			loginCredentials.email,
			UserRole.candidate
		);

		await AuthHelper.validatePassword(
			loginCredentials.password,
			candidate.password
		);
		const authToken = AuthHelper.generateAuthToken(candidate);
		return authToken;
	},
};
