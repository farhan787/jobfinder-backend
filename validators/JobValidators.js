const ApplicationError = require('../errors/ApplicationError');
const ResponseCodes = require('../config/ResponseCodes');

module.exports = {
	jobPostData: (job) => {
		const { title, recruiter_id } = job;
		if (!title) {
			throw new ApplicationError(
				'title is missing from request body',
				ResponseCodes.badRequest
			);
		}

		if (isNaN(recruiter_id)) {
			throw new ApplicationError(
				'recruiterId should be an integer in request params',
				ResponseCodes.badRequest
			);
		}
	},
};
