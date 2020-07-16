const { DataTypes, Model } = require('sequelize');

class Job extends Model {
	static init(sequelize) {
		return super.init(
			{
				uuid: {
					type: DataTypes.UUID,
					defaultValue: DataTypes.UUIDV4,
					allowNull: false,
				},
				title: {
					type: DataTypes.STRING,
					allowNull: false,
				},
				description: DataTypes.STRING,
				location: DataTypes.STRING,
			},
			{ sequelize, modelName: 'Job', tableName: 'jobs' }
		);
	}
}

module.exports = Job;
