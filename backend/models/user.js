const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const dotenv = require('dotenv').config();
if (dotenv.error) throw dotenv.error;

/**
 * auth Users
 */
const User = sequelize.define(dotenv.parsed.USERS, {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	username: {
		type: Sequelize.STRING,
		allowNull: false
	},
	password: {
		type: Sequelize.STRING,
		allowNull: false
	},
	role: {
		type: Sequelize.INTEGER,
		allowNull: false
	}
});

module.exports = User;