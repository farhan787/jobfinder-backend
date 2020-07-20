const ApplicationError = require('../errors/ApplicationError');
const ResponseCodes = require('../config/ResponseCodes');

module.exports = {
	validateSignupData: (signupData) => {
		const { name, email, password, role } = signupData;
		if (!name) {
			throw new ApplicationError(
				'name is missing from request body',
				ResponseCodes.badRequest
			);
		}
		if (!email) {
			throw new ApplicationError(
				'email is missing from request body',
				ResponseCodes.badRequest
			);
		}
		if (!password) {
			throw new ApplicationError(
				'password is missing from request body',
				ResponseCodes.badRequest
			);
		}
		if (!role) {
			throw new ApplicationError(
				'role is missing from request body',
				ResponseCodes.badRequest
			);
		}
	},

	validateLoginData: (loginCredentials) => {
		const { email, password } = loginCredentials;
		if (!email) {
			throw new ApplicationError(
				'email is missing from request body',
				ResponseCodes.badRequest
			);
		}

		if (!password) {
			throw new ApplicationError(
				'password is missing from request body',
				ResponseCodes.badRequest
			);
		}
	},
};
