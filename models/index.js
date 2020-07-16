const { Sequelize } = require('sequelize');
const DB_CONFIG = require('../config/database');

const UserModel = require('./User');
const JobModel = require('./Job');
const JobApplicationModel = require('./JobApplication');

const sequelize = new Sequelize(
	DB_CONFIG.database,
	DB_CONFIG.userName,
	DB_CONFIG.password,
	{
		host: { DB_CONFIG },
		dialect: DB_CONFIG.dialect,
		operatorsAliases: false,
		timezone: '+05:30',
		pool: {
			max: 5,
			min: 0,
			acquire: 30000,
			idle: 10000,
		},
	}
);

const db = {
	UserModel: UserModel.init(sequelize),
	JobModel: JobModel.init(sequelize),
	JobApplicationModel: JobApplicationModel.init(sequelize),
};

db.UserModel.hasMany(JobModel, {
	foreignKey: {
		name: 'recruiter_id',
		allowNull: false,
	},
});

db.UserModel.hasMany(JobApplicationModel, {
	foreignKey: {
		name: 'candidate_id',
		allowNull: false,
	},
});

Object.values(db)
	.filter((model) => typeof model.associate === 'function')
	.forEach((model) => model.associate(db));

Object.values(db)
	.filter((model) => typeof model.hooks === 'function')
	.forEach((model) => model.hooks(db));

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = sequelize;
