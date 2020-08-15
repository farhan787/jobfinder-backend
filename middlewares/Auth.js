require('dotenv').config();
const jwt = require('jsonwebtoken');

const ApplicationError = require('../errors/ApplicationError');
const Errors = require('../errors/Errors');

module.exports = (req, res, next) => {
	const authToken = req.header('authToken');
	if (!authToken) {
		throw new ApplicationError(
			Errors.noAuthToken().message,
			Errors.noAuthToken().status
		);
	}

	const decoded = jwt.decode(authToken, process.env.jwtPrivateKey);
	req.user = decoded;
	next();
};
