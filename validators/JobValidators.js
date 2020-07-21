const ApplicationError = require('../errors/ApplicationError');
const ResponseCodes = require('../config/ResponseCodes');

module.exports = {
	jobPostData: (job) => {
		const { title } = job;
		if (!title) {
			throw new ApplicationError(
				'title is missing from request body',
				ResponseCodes.badRequest
			);
		}
	},
};
