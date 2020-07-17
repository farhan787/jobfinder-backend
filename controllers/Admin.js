const Admin = require('../services/Admin');

module.exports = {
	signup: async (req, res) => {
		const admin = req.body;
		if (admin.role !== 1)
			return res
				.status(400)
				.send({ msg: 'Role should be 1 for admin signup' });

		await Admin.signup(admin);
		res.send('signup done');
	},
};
