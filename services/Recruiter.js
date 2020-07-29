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

	getPostedJobs: async (recruiter) => {
		const recruiterData = await EntityExist.userShouldExistByUUID(
			recruiter.uuid,
			UserRole.recruiter
		);
		let postedJobs = await JobModel.findAll({
			where: { recruiter_id: recruiterData.id },
		});
		postedJobs = _.map(
			postedJobs,
			_.partialRight(_.pick, ['uuid', 'title', 'description', 'location'])
		);
		return postedJobs;
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
			_.partialRight(_.pick, ['uuid', 'name', 'email', 'phone'])
		);
		return recruiters;
	},

	signup: async (recruiter) => {
		AuthValidators.validateSignupData(recruiter);
		userRoleValidator(recruiter.role, UserRole.recruiter);

		await EntityExist.userShouldNotExist(recruiter.email, UserRole.recruiter);
		if (recruiter.phone) {
			await EntityExist.phoneShouldNotExist(recruiter.phone);
		}

		recruiter.password = await AuthHelper.hashPassword(recruiter.password);
		const savedRecruiter = await UserModel.create(recruiter);
		return savedRecruiter;
	},

	login: async (loginCredentials) => {
		AuthValidators.validateLoginData(loginCredentials);
		const recruiter = await EntityExist.userShouldExist(
			loginCredentials.email,
			UserRole.recruiter
		);

		await AuthHelper.validatePassword(
			loginCredentials.password,
			recruiter.password,
			loginCredentials.email
		);
		const authToken = AuthHelper.generateAuthToken(recruiter);
		return authToken;
	},
};
