const EMAIL_CONFIG = {
	host: process.env.emailHost,
	port: process.env.emailPort,
	secure: process.env.emailPort === 465 ? true : false,
	user: process.env.emailUser,
	pass: process.env.emailPass,
};

module.exports = EMAIL_CONFIG;
