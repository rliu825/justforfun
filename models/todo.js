module.exports = function(sequelize, DataTypes) {
	return	sequelize.define('todo', {
		firstname: {
			type: DataTypes.STRING,
			//allowNull: false,
			validate: {
				len: [1, 100]
			}
		},
		lastname: {
			type: DataTypes.STRING,
			//allowNull: false,
			validate: {
				len: [1, 100]
			}
		},

		location: {
			type: DataTypes.STRING,
			//allowNull: false,
			validate: {
				len: [1, 20]
			}
		},
		description: {
			type: DataTypes.STRING,
			//allowNull: false,
			validate: {
				len: [1, 250]
			}
		},

	});
}




		// title: {
		// 	type: DataTypes.STRING,
		// 	//allowNull: false,
		// 	validate: {
		// 		len: [1, 30]
		// 	}
		// },
		// story: {
		// 	type: DataTypes.STRING,
		// 	//allowNull: false,
		// 	validate: {
		// 		len: [1, 250]
		// 	}
		// }