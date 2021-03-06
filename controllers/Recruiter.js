const Recruiter = require('../services/Recruiter');
const ResponseCodes = require('../config/ResponseCodes');
const ResponseTransformer = require('../transformers/response');

module.exports = {
	getPostedJobs: async (req, res) => {
		const recruiter = req.user;
		const postedJobs = await Recruiter.getPostedJobs(recruiter);
		const resData = ResponseTransformer.success(
			ResponseCodes.success,
			postedJobs
		);
		res.status(resData.code).send(resData);
	},

	getRecruiters: async (req, res) => {
		const { page, limit } = req.query;

		const recruiters = await Recruiter.getRecruiters({ page, limit });
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
		const recruiter = req.body;
		const savedRecruiter = await Recruiter.signup(recruiter);

		const resData = ResponseTransformer.success(
			ResponseCodes.created,
			{ uuid: savedRecruiter.uuid },
			'created'
		);
		res.status(resData.code).send(resData);
	},

	login: async (req, res) => {
		const { email, password } = req.body;
		const authToken = await Recruiter.login({ email, password });
		const resData = ResponseTransformer.success(ResponseCodes.success, {
			authToken,
		});
		res.status(resData.code).send(resData);
	},
};
