const db = require('../models/index');
const UserModel = db.models.User;

module.exports = {
	signup: async (recruiter) => {
		try {
			await UserModel.create(recruiter);
		} catch (err) {
			console.log(err);
		}
	},
};
