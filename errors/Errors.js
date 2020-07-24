const ResponseCodes = require('../config/ResponseCodes');

module.exports = {
	accessDenied: () => {
		return { message: `Access denied`, status: ResponseCodes.forbidden };
	},

	duplicateError: (entity) => {
		return {
			message: `${entity} already exist`,
			status: ResponseCodes.forbidden,
		};
	},

	forbidden: (message) => {
		return {
			message,
			status: ResponseCodes.forbidden,
		};
	},

	invalidRole: (correctRole) => {
		return {
			message: `invalid role: role should be ${correctRole}`,
			status: ResponseCodes.badRequest,
		};
	},

	notExist: (entity) => {
		return {
			message: `${entity} does not exist`,
			status: ResponseCodes.notFound,
		};
	},

	noAuthToken: () => {
		return {
			message: `authToken is missing in request header`,
			status: ResponseCodes.badRequest,
		};
	},

	unauthorized: (message = 'unauthorized') => {
		return {
			message,
			status: ResponseCodes.unauthorized,
		};
	},
};
