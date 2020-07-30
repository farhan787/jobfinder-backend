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

		if (title) {
			if (title.length < 3) {
				throw new ApplicationError(
					'title should be minimun of length 3',
					ResponseCodes.unprocessableEntity
				);
			}
			if (title.length > 50) {
				throw new ApplicationError(
					'title should be maximum of length 50',
					ResponseCodes.unprocessableEntity
				);
			}
		}

		if (!description) {
			throw new ApplicationError(
				'description is missing from request body',
				ResponseCodes.unprocessableEntity
			);
		}

		if (description) {
			if (description.length < 3) {
				throw new ApplicationError(
					'description should be minimun of length 3',
					ResponseCodes.unprocessableEntity
				);
			}
			if (description.length > 50) {
				throw new ApplicationError(
					'description should be maximum of length 50',
					ResponseCodes.unprocessableEntity
				);
			}
		}

		if (!location) {
			throw new ApplicationError(
				'location is missing from request body',
				ResponseCodes.unprocessableEntity
			);
		}

		if (location) {
			if (location.length < 3) {
				throw new ApplicationError(
					'location should be minimun of length 3',
					ResponseCodes.unprocessableEntity
				);
			}
			if (location.length > 50) {
				throw new ApplicationError(
					'location should be maximum of length 50',
					ResponseCodes.unprocessableEntity
				);
			}
		}
	},
};
