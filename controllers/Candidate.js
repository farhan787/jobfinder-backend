const Candidate = require('../services/Candidate');
const ResponseCodes = require('../config/ResponseCodes');
const ResponseTransformer = require('../transformers/response');

module.exports = {
	availableJobs: async (req, res) => {
		const candidate = req.user;
		const availableJobs = await Candidate.availableJobs(candidate.uuid);
		const resData = ResponseTransformer.success(
			ResponseCodes.success,
			availableJobs
		);
		res.status(resData.code).send(resData);
	},

	deleteCandidate: async (req, res) => {
		const { candidateId } = req.params;
		const candidate = await Candidate.deleteCandidate(candidateId);
		const resData = ResponseTransformer.success(
			ResponseCodes.success,
			candidate,
			'Candidate successfully deleted'
		);
		res.status(resData.code).send(resData);
	},

	getAppliedJobs: async (req, res) => {
		const candidate = req.user;
		const appliedJobs = await Candidate.getAppliedJobs(candidate.uuid);
		const resData = ResponseTransformer.success(
			ResponseCodes.success,
			appliedJobs
		);
		res.status(resData.code).send(resData);
	},

	getCandidates: async (req, res) => {
		const { page, limit } = req.query;

		const candidates = await Candidate.getCandidates({ page, limit });
		const resData = ResponseTransformer.success(
			ResponseCodes.success,
			candidates
		);
		res.status(resData.code).send(resData);
	},

	getJobCandidates: async (req, res) => {
		const { jobId } = req.params;
		const candidates = await Candidate.getJobCandidates(jobId);
		const resData = ResponseTransformer.success(
			ResponseCodes.success,
			candidates
		);
		res.status(resData.code).send(resData);
	},

	signup: async (req, res) => {
		const user = req.body;
		await Candidate.signup(user);

		const resData = ResponseTransformer.success(
			ResponseCodes.success,
			{},
			'Signup Successful'
		);
		res.status(resData.code).send(resData);
	},

	login: async (req, res) => {
		const { email, password } = req.body;
		const authToken = await Candidate.login({ email, password });
		const resData = ResponseTransformer.success(ResponseCodes.success, {
			authToken,
		});
		res.status(resData.code).send(resData);
	},
};
