const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const dotenv = require('dotenv').config();
if (dotenv.error) throw dotenv.error;

const Book = sequelize.define(dotenv.parsed.BOOKS, {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	cost: {
		type: Sequelize.INTEGER,
		allowNull: false
	}
});

module.exports = Book;