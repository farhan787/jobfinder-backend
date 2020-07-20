const ResponseCodes = require('../config/ResponseCodes');

module.exports = {
	success: (
		code = ResponseCodes.success,
		data,
		message = '',
		status = true
	) => {
		return {
			code,
			data,
			message,
			status: code >= 400 ? false : true,
		};
	},

	error: (err, status) => {
		return {
			error: { message: err },
			status,
		};
	},
};
