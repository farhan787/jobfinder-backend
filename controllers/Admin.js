const Admin = require('../services/Admin');
const ResponseCodes = require('../config/ResponseCodes');
const ResponseTransformer = require('../transformers/response');

module.exports = {
	signup: async (req, res) => {
		const admin = req.body;
		await Admin.signup(admin);

		const resData = ResponseTransformer.success(
			ResponseCodes.success,
			{},
			'Signup Successful'
		);
		res.status(resData.code).send(resData);
	},

	login: async (req, res) => {
		const { email, password } = req.body;
		const authToken = await Admin.login({ email, password });
		res.header({ authToken }).status(ResponseCodes.success).send();
	},
};
