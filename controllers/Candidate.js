const Candidate = require('../services/Candidate');

module.exports = {
	signup: async (req, res) => {
		const candidate = req.body;
		if (candidate.role !== 3)
			return res
				.status(400)
				.send({ msg: 'Role should be 3 for candidate signup' });

		await Candidate.signup(candidate);
		res.send('signup done');
	},
};
