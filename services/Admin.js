const AuthValidators = require('../validators/AuthValidators');
const EntityExist = require('../helpers/EntityExist');
const AuthHelper = require('../helpers/Auth');
const userRoleValidator = require('../validators/RoleValidator');
const UserRole = require('../config/UserRole');

const db = require('../models/index');
const UserModel = db.models.User;

module.exports = {
	login: async (loginCredentials) => {
		AuthValidators.validateLoginData(loginCredentials);
		const admin = await EntityExist.userShouldExist(
			loginCredentials.email,
			UserRole.admin
		);

		await AuthHelper.validatePassword(
			loginCredentials.password,
			admin.password
		);
		const authToken = AuthHelper.generateAuthToken(admin);
		return authToken;
	},

	signup: async (admin) => {
		AuthValidators.validateSignupData(admin);
		userRoleValidator(admin.role, UserRole.admin);

		await EntityExist.userShouldNotExist(admin.email, UserRole.admin);

		admin.password = await AuthHelper.hashPassword(admin.password);
		await UserModel.create(admin);
	},
};
