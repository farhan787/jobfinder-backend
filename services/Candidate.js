const db = require('../models/index');
const UserModel = db.models.User;

module.exports = {
	async signup(candidate) {
		try {
			await UserModel.create(candidate);
		} catch (err) {
			console.log(err);
		}
	},
};
