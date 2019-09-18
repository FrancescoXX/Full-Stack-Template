/*
*   Database connection util
*/
const Sequelize = require('sequelize');
const dotenv = require('dotenv').config();
if (dotenv.error) throw dotenv.error;

const sequelize = new Sequelize(
    process.env.PGDATABASE,
    process.env.PGUSER,
    process.env.PGPASSWORD,
    {
        host: process.env.PGHOST,
        dialect: dotenv.parsed.DBDIALECT
    });

module.exports = sequelize;