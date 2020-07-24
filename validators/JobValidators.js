const ApplicationError = require('../errors/ApplicationError');
const ResponseCodes = require('../config/ResponseCodes');

module.exports = {
	jobPostData: (job) => {
		const { title, description, location } = job;
		if (!title) {
			throw new ApplicationError(
				'title is missing from request body',
				ResponseCodes.unprocessableEntity
			);
		}

		if (!description) {
			throw new ApplicationError(
				'description is missing from request body',
				ResponseCodes.unprocessableEntity
			);
		}

		if (!location) {
			throw new ApplicationError(
				'location is missing from request body',
				ResponseCodes.unprocessableEntity
			);
		}
	},
};
