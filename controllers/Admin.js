const Admin = require('../services/Admin');
const UserRole = require('../config/UserRole');

module.exports = {
	signup: async (req, res) => {
		const admin = req.body;
		if (admin.role !== UserRole.admin)
			return res.status(400).send({ msg: 'Role should be 1 for admin signup' });

		await Admin.signup(admin);
		res.send('signup done');
	},
};
