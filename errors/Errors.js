const ResponseCodes = require('../config/ResponseCodes');

module.exports = {
	duplicateError: (entity) => {
		return {
			message: `${entity} already exist`,
			status: ResponseCodes.badRequest,
		};
	},

	notExist: (entity) => {
		return {
			message: `${entity} does not exist`,
			status: ResponseCodes.notFound,
		};
	},

	invalidPassword: () => {
		return {
			message: `invalid password`,
			status: ResponseCodes.badRequest,
		};
	},
};
