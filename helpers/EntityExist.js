const ApplicationError = require('../errors/ApplicationError');
const Errors = require('../errors/Errors');

const db = require('../models/index');
const UserModel = db.models.User;
const JobModel = db.models.Job;

module.exports = {
	userShouldExist: async (email, role) => {
		const user = await UserModel.findOne({
			where: { email, role },
		});
		if (!user) {
			throw new ApplicationError(
				Errors.notExist(email).message,
				Errors.notExist(email).status
			);
		}

		return user;
	},

	userShouldNotExist: async (email, role) => {
		const user = await UserModel.findOne({
			where: { email, role },
		});
		if (user) {
			throw new ApplicationError(
				Errors.duplicateError(email).message,
				Errors.duplicateError(email).status
			);
		}
	},

	userShouldExistByUUID: async (uuid, role) => {
		const user = await UserModel.findOne({
			where: { uuid, role },
		});
		if (!user) {
			throw new ApplicationError(
				Errors.notExist(uuid).message,
				Errors.notExist(uuid).status
			);
		}
		return user;
	},

	jobShouldExistByUUID: async (uuid) => {
		const job = await JobModel.findOne({
			where: { uuid },
		});
		if (!job) {
			throw new ApplicationError(
				Errors.notExist(uuid).message,
				Errors.notExist(uuid).status
			);
		}
		return job;
	},
};
