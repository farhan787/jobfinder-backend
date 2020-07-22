const ApplicationError = require('../errors/ApplicationError');
const Errors = require('../errors/Errors');
const UserRole = require('../config/UserRole');

module.exports = (req, res, next) => {
	if (req.user.role != UserRole.candidate) {
		throw new ApplicationError(
			Errors.accessDenied().message,
			Errors.accessDenied().status
		);
	}
	next();
};
