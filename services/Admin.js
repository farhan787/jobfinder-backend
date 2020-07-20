const db = require('../models/index');
const UserModel = db.models.User;

module.exports = {
	signup: async (admin) => {
		try {
			await UserModel.create(admin);
		} catch (err) {
			console.log(err);
		}
	},
};
