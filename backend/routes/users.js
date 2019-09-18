//Generic API Route file

/* 
*  SET environment variables in:
*  process.env directly
*  using dotenv (.env file)
*  in docker.compose.yml
*/

const dotenv = require('dotenv').config(); if (dotenv.error) throw dotenv.error;
const controller = require('../controllers/' + dotenv.parsed.USERS); //Environment variable in .env file
const router = require('express').Router();

//READ ALL USERS -> [GET] ../users
router.get('/', controller.getAll);

//READ ONE USER -> [GET] ../users/id
router.get('/:id', controller.getOne);

//CREATE ONE USER -> [POST] ../users
router.post('/', controller.createOne);

//UPDATE ONE USER -> [PUT] ../users/id
router.put('/:id', controller.updateOne);

//DELETE ONE USER -> [DELETE] ../users/id
router.delete('/:id', controller.deleteOne);

module.exports = router;