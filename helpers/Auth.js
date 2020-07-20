require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const ApplicationError = require('../errors/ApplicationError');
const Errors = require('../errors/Errors');

module.exports = {
	hashPassword: async (password) => {
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);
		return hashedPassword;
	},

	decode: async (token) => {
		const decodedToken = jwt.verify(token, process.env.jwtPrivateKey);
		console.log(decodedToken);
	},

	generateAuthToken: async (user) => {
		const authToken = jwt.sign(
			{ id: user.id, email: user.email, role: user.role },
			process.env.jwtPrivateKey
		);
		return authToken;
	},

	validatePassword: async (passwordToVerify, actualPassword) => {
		const validPassword = await bcrypt.compare(
			passwordToVerify,
			actualPassword
		);

		if (!validPassword) {
			console.log('global error handler not working for this');
			console.log('valid password ', validPassword);
			throw new ApplicationError(
				Errors.invalidPassword().message,
				Errors.invalidPassword().status
			);
		}
	},
};
