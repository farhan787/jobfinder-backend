const Candidate = require('../services/Candidate');
const ResponseCodes = require('../config/ResponseCodes');
const ResponseTransformer = require('../transformers/response');

module.exports = {
	signup: async (req, res) => {
		const user = req.body;
		await Candidate.signup(user);

		const resData = ResponseTransformer.success(
			ResponseCodes.success,
			{},
			'Signup Successful'
		);
		res.status(resData.status).send(resData);
	},

	login: async (req, res) => {
		const { email, password } = req.body;
		const authToken = await Candidate.login({ email, password });
		res.header({ authToken }).status(ResponseCodes.success).send();
	},
};
