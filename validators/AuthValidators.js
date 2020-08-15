const ApplicationError = require('../errors/ApplicationError');
const ResponseCodes = require('../config/ResponseCodes');

const ALPHABET_SPACE_REGEX = /^[a-zA-Z ]*$/;
const MIN_PASSWORD_LENGTH = 6;

module.exports = {
	validateSignupData: (signupData) => {
		const { name, email, password, role } = signupData;
		if (!name) {
			throw new ApplicationError(
				'name is missing from request body',
				ResponseCodes.unprocessableEntity
			);
		}

		if (!name.match(ALPHABET_SPACE_REGEX)) {
			throw new ApplicationError(
				'name should only contain alphabets',
				ResponseCodes.unprocessableEntity
			);
		}

		if (!email) {
			throw new ApplicationError(
				'email is missing from request body',
				ResponseCodes.unprocessableEntity
			);
		}
		if (!password) {
			throw new ApplicationError(
				'password is missing from request body',
				ResponseCodes.unprocessableEntity
			);
		}

		if (password.length < MIN_PASSWORD_LENGTH) {
			throw new ApplicationError(
				'password length should be at least 6',
				ResponseCodes.unprocessableEntity
			);
		}

		if (!role) {
			throw new ApplicationError(
				'role is missing from request body',
				ResponseCodes.unprocessableEntity
			);
		}
	},

	validateLoginData: (loginCredentials) => {
		const { email, password } = loginCredentials;
		if (!email) {
			throw new ApplicationError(
				'email is missing from request body',
				ResponseCodes.unprocessableEntity
			);
		}

		if (!password) {
			throw new ApplicationError(
				'password is missing from request body',
				ResponseCodes.unprocessableEntity
			);
		}
	},
};
