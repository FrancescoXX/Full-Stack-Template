const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config(); //to handle Environment variables. uses .env file
const sequelize = require('./util/database'); //database initializations 
const Product = require('./models/product');
const User = require('./models/user');
const Book = require('./models/book');

const winston = require('winston');

//GET ENV VARIABLES FROM .env file
if (dotenv.error) throw dotenv.error; else console.log(dotenv.parsed);

//INITIALIZE APP WITH EXPRESS
const app = express();

//BODYPARSER
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Set proper Headers on Backend
app.use((reg, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	next();
})

//ROUTES
app.use('/dev', require('./routes/dev')); //All test routes are placed here
app.use('/auth', require('./routes/auth')); //Authentication with JWT
app.use('/publics', require('./routes/publics'));
app.use('/' + dotenv.parsed.BOOKS, require('./routes/' + dotenv.parsed.BOOKS)); //DEF in .env
app.use('/' + dotenv.parsed.USERS, require('./routes/' + dotenv.parsed.USERS)); //DEF in .env
//..add Resource here, using new Environment variables in .env


//WINSTON
const logger = winston.createLogger({
	level: 'info',
	format: winston.format.json(),
	defaultMeta: { service: 'user-service' },
	transports: [
		//
		// - Write to all logs with level `info` and below to `combined.log` 
		// - Write all logs error (and below) to `error.log`.
		//
		new winston.transports.File({ filename: 'error.log', level: 'error' }),
		new winston.transports.File({ filename: 'combined.log' })
	]
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
// 
if (process.env.NODE_ENV !== 'production') {
	logger.add(new winston.transports.Console({
		format: winston.format.simple()
	}));
}

// AXIOS
const axios = require('axios');
axios.get('https://jsonplaceholder.typicode.com/todos/1')
	.then(function (response) {
		// handle success
		console.log("AXIOS SUCCESS");
		logger.info(`Winston: AXIOS SUCCESS`);
	})
	.catch(function (error) {
		// handle error
		console.log("AXIOS ERROR");
	})
	.finally(function () {
		// always executed
	});

//Start Application is Sequelize is correctly connected
if (dotenv.parsed.WITHDOCKER == 1) {
	(async () => {
		try {
			await sequelize.sync(); // wait till the promise resolves (*)
			app.listen(process.env.INTERNAL_PORT, process.env.HOST); //DEF in docker.compose.yml
			console.log(process.env); //Log ENVIRONMENT VARIABLES in docker.compose.yml and .env
			console.log(`Winston: Running on ${process.env.HOST}:${process.env.INTERNAL_PORT}\nREADY WITH DOCKER...`);
		} catch (error) {
			console.log(error);
		}
	})();
} else {
	console.log("WITHOUT DOCKER...")
}
