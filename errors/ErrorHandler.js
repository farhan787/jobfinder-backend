const ApplicationError = require('./ApplicationError');
const ResponseCodes = require('../config/ResponseCodes');
const ResponseTransformer = require('../transformers/response');

module.exports = function (err, req, res, next) {
	let response = null;

	switch (err.constructor) {
		case ApplicationError:
			response = ResponseTransformer.error(
				err.message,
				err.status || ResponseCodes.internalServerError
			);
			res.status(response.status).send(response);
			break;

		default:
			response = ResponseTransformer.error(
				err.message,
				ResponseCodes.internalServerError
			);
			res.status(response.status).send(response);
	}
};
