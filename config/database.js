const DB_CONFIG = {
	database: process.env.database,
	userName: process.env.userName,
	password: process.env.password,
	host: process.env.host,
	dialect: process.env.dialect,
};

module.exports = DB_CONFIG;
