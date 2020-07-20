const ApplicationError = require('../errors/ApplicationError');
const Errors = require('../errors/Errors');

const db = require('../models/index');
const UserModel = db.models.User;

module.exports = {
	userShouldExist: async (email) => {
		const user = await UserModel.findOne({
			where: { email: email },
		});

		if (!user) {
			throw new ApplicationError(
				Errors.notExist(email).message,
				Errors.notExist(email).status
			);
		}

		return user;
	},

	userShouldNotExist: async (email) => {
		const user = await UserModel.findOne({
			where: { email: email },
		});

		if (user) {
			throw new ApplicationError(
				Errors.duplicateError(email).message,
				Errors.duplicateError(email).status
			);
		}
	},
};
