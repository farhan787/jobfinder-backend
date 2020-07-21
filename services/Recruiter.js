const _ = require('lodash');
const AuthValidators = require('../validators/AuthValidators');
const EntityExist = require('../helpers/EntityExist');
const AuthHelper = require('../helpers/Auth');
const userRoleValidator = require('../validators/RoleValidator');
const UserRole = require('../config/UserRole');
const paginationHelper = require('../helpers/PaginationHelper');

const db = require('../models/index');

const UserModel = db.models.User;
const JobModel = db.models.Job;
const JobApplicationModel = db.models.JobApplication;

module.exports = {
	deleteRecruiter: async (recruiterUUID) => {
		let recruiter = await EntityExist.userShouldExistByUUID(
			recruiterUUID,
			UserRole.recruiter
		);

		await db.transaction(async (t) => {
			const jobsPostedByRecruiter = await JobModel.findAll({
				where: { recruiter_id: recruiter.id },
				transaction: t,
			});
			const jobIds = jobsPostedByRecruiter.map((job) => job.id);

			await JobModel.destroy({
				where: { id: jobIds },
				transaction: t,
			});

			await JobApplicationModel.destroy({
				where: { job_id: jobIds },
				transaction: t,
			});

			await UserModel.destroy({
				where: { id: recruiter.id, role: UserRole.recruiter },
				transaction: t,
			});
		});

		recruiter = _.pick(recruiter, ['uuid', 'name', 'email', 'phone']);
		return recruiter;
	},

	getRecruiters: async (paginationData) => {
		const { limit, offset } = paginationHelper(paginationData);

		let recruiters = await UserModel.findAll({
			where: { role: UserRole.recruiter },
			limit,
			offset,
		});
		recruiters = _.map(
			recruiters,
			_.partialRight(_.pick, ['name', 'email', 'phone'])
		);
		return recruiters;
	},

	signup: async (recruiter) => {
		AuthValidators.validateSignupData(recruiter);
		userRoleValidator(recruiter.role, UserRole.recruiter);

		await EntityExist.userShouldNotExist(recruiter.email, UserRole.recruiter);

		recruiter.password = await AuthHelper.hashPassword(recruiter.password);
		await UserModel.create(recruiter);
	},

	login: async (loginCredentials) => {
		AuthValidators.validateLoginData(loginCredentials);
		const recruiter = await EntityExist.userShouldExist(
			loginCredentials.email,
			UserRole.recruiter
		);

		AuthHelper.validatePassword(loginCredentials.password, recruiter.password);
		const authToken = AuthHelper.generateAuthToken(recruiter);
		return authToken;
	},
};
