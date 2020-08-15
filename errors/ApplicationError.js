const ResponseCodes = require('../config/ResponseCodes');

class ApplicationError extends Error {
	constructor(message = null, status = null) {
		super();

		this.message = message || 'Something went wrong. Please try again later.';
		this.status = status || ResponseCodes.internalServerError;

		Error.captureStackTrace(this, this.constructor);
		this.name = this.constructor.name;
	}
}

module.exports = ApplicationError;
