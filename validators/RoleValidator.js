const ApplicationError = require('../errors/ApplicationError');
const Errors = require('../errors/Errors');

const userRoleValidator = (role, expectedRole) => {
	if (role != expectedRole) {
		throw new ApplicationError(
			Errors.invalidRole(expectedRole).message,
			Errors.invalidRole(expectedRole).status
		);
	}
};

module.exports = userRoleValidator;
