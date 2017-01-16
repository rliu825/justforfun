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
		//true for guide, false for tourist
		role: {
			type: DataTypes.BOOLEAN,
			//allowNull: false,
			defaultValue: false
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
	});
}




		// review: {
		// 	type: DataTypes.INTEGER,
		// 	allowNull: false,
		// 	defaultValue: false
		// }
	// }, {
	// hooks: {
	// 	beforeValidate: function(todo, options){
	// 		todo.firstname = ''
	// 	},
	// 	afterValidate: function(user, options) {
	// 	return sequelize.Promise.reject("I'm afraid I can't let you do that!");
	// 	}
	// }
	// });
