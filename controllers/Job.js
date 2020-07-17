const Job = require('../services/Job');

module.exports = {
	postJob: async (req, res) => {
		const job = req.body;
		const { recruiterId } = req.params;

		await Job.postJob(job, recruiterId);
		res.send('job posted');
	},
};
