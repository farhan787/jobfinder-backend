const AuthValidators = require('../validators/AuthValidators');
const EntityExist = require('../helpers/EntityExist');
const AuthHelper = require('../helpers/Auth');

const db = require('../models/index');
const UserModel = db.models.User;

module.exports = {
	signup: async (recruiter) => {
		AuthValidators.validateSignupData(recruiter);
		await EntityExist.userShouldNotExist(recruiter.email);

		recruiter.password = await AuthHelper.hashPassword(recruiter.password);
		await UserModel.create(recruiter);
	},

	login: async (loginCredentials) => {
		AuthValidators.validateLoginData(loginCredentials);
		const recruiter = await EntityExist.userShouldExist(loginCredentials.email);

		AuthHelper.validatePassword(loginCredentials.password, recruiter.password);
		const authToken = AuthHelper.generateAuthToken(recruiter);
		return authToken;
	},
};
