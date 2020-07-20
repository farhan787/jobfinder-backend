const { DataTypes, Model } = require('sequelize');

class User extends Model {
	static init(sequelize) {
		return super.init(
			{
				uuid: {
					type: DataTypes.UUID,
					defaultValue: DataTypes.UUIDV4,
					allowNull: false,
				},
				name: {
					type: DataTypes.STRING,
					allowNull: false,
				},
				email: {
					type: DataTypes.STRING,
					allowNull: false,
				},
				phone: DataTypes.STRING,
				password: {
					type: DataTypes.STRING,
					allowNull: false,
				},
				skills: DataTypes.STRING,
				role: {
					type: DataTypes.INTEGER,
					allowNull: false,
				},
			},
			{ sequelize, modelName: 'User', tableName: 'users' }
		);
	}
}

module.exports = User;
