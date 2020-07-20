const db = require('../models/index');
const AuthValidators = require('../validators/AuthValidators');
const EntityExist = require('../helpers/EntityExist');
const AuthHelper = require('../helpers/Auth');

const UserModel = db.models.User;

module.exports = {
	signup: async (candidate) => {
		AuthValidators.validateSignupData(candidate);
		await EntityExist.userShouldNotExist(candidate.email);

		candidate.password = await AuthHelper.hashPassword(candidate.password);
		await UserModel.create(candidate);
	},

	login: async (loginCredentials) => {
		AuthValidators.validateLoginData(loginCredentials);
		const candidate = await EntityExist.userShouldExist(loginCredentials.email);

		AuthHelper.validatePassword(loginCredentials.password, candidate.password);
		const authToken = AuthHelper.generateAuthToken(user);
		return authToken;
	},
};
