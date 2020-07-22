const { createLogger, transports, format } = require('winston');

const logger = createLogger({
	transports: [
		new transports.File({
			level: 'info',
			filename: 'failedLogin.log',
			format: format.combine(format.timestamp(), format.json()),
		}),
	],
});

module.exports = logger;
