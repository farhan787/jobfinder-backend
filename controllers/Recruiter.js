const Recruiter = require('../services/Recruiter');
const ResponseCodes = require('../config/ResponseCodes');
const ResponseTransformer = require('../transformers/response');

module.exports = {
	getRecruiters: async (req, res) => {
		const recruiters = await Recruiter.getRecruiters();
		const resData = ResponseTransformer.success(
			ResponseCodes.success,
			recruiters
		);
		res.status(resData.code).send(resData);
	},

	deleteRecruiter: async (req, res) => {
		const { recruiterId } = req.params;
		const recruiter = await Recruiter.deleteRecruiter(recruiterId);
		const resData = ResponseTransformer.success(
			ResponseCodes.success,
			recruiter,
			'Recruiter successfully deleted'
		);
		res.status(resData.code).send(resData);
	},

	signup: async (req, res) => {
		const user = req.body;
		await Recruiter.signup(user);

		const resData = ResponseTransformer.success(
			ResponseCodes.success,
			{},
			'Signup Successful'
		);
		res.status(resData.code).send(resData);
	},

	login: async (req, res) => {
		const { email, password } = req.body;
		const authToken = await Recruiter.login({ email, password });
		res.header({ authToken }).status(ResponseCodes.success).send();
	},
};
