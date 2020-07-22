const ApplicationError = require('../errors/ApplicationError');
const Errors = require('../errors/Errors');

module.exports = (allowedRoles) => {
	return (req, res, next) => {
		const currentUserRole = req.user.role;

		if (!allowedRoles.includes(currentUserRole)) {
			throw new ApplicationError(
				Errors.accessDenied().message,
				Errors.accessDenied().status
			);
		}
		next();
	};
};
