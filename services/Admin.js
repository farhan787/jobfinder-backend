const db = require('../models/index');
const UserModel = db.models.User;

module.exports = {
	async signup(admin) {
		try {
			await UserModel.create(admin);
		} catch (err) {
			console.log(err);
		}
	},
};
