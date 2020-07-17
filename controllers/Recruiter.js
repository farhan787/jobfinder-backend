const Recruiter = require('../services/Recruiter');

module.exports = {
	signup: async (req, res) => {
		const recruiter = req.body;
		if (recruiter.role !== 2)
			return res
				.status(400)
				.send({ msg: 'Role should be 2 for recruiter signup' });

		await Recruiter.signup(recruiter);
		res.send('signup done');
	},
};
