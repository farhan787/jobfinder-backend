const { DataTypes, Model } = require('sequelize');

class JobApplication extends Model {
	static init(sequelize) {
		return super.init(
			{
				uuid: {
					type: DataTypes.UUID,
					defaultValue: DataTypes.UUIDV4,
					allowNull: false,
				},
				job_id: {
					type: DataTypes.INTEGER,
					allowNull: false,
				},
			},
			{ sequelize, modelName: 'JobApplication', tableName: 'job_applications' }
		);
	}
}

module.exports = JobApplication;
