const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const dotenv = require('dotenv').config();
if (dotenv.error) throw dotenv.error;

const Product = sequelize.define(dotenv.parsed.PRODUCTS, {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: Sequelize.STRING, //shorthand for simple properties
    price: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    imageUrl: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Product;