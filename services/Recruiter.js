const _ = require('lodash');
const AuthValidators = require('../validators/AuthValidators');
const EntityExist = require('../helpers/EntityExist');
const AuthHelper = require('../helpers/Auth');
const userRoleValidator = require('../validators/RoleValidator');
const UserRole = require('../config/UserRole');

const db = require('../models/index');
const UserModel = db.models.User;

module.exports = {
	getRecruiters: async () => {
		let recruiters = await UserModel.findAll({
			where: { role: UserRole.recruiter },
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
