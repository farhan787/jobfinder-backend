const db = require('../models/index');
const UserModel = db.models.User;

module.exports = {
	async signup(recruiter) {
		try {
			await UserModel.create(recruiter);
		} catch (err) {
			console.log(err);
		}
	},
};
