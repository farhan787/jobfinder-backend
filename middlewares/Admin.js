const ApplicationError = require('../errors/ApplicationError');
const Errors = require('../errors/Errors');

module.exports = (req, res, next) => {
	if (!req.user.isAdmin) {
		throw new ApplicationError(
			Errors.accessDenied().message,
			Errors.accessDenied().status
		);
	}
};
