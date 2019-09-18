
/*
* Generic secured API Route file
*/
//Get All wothput authentication
const controller = require('../controllers/books');
const router = require('express').Router();
const isAuth = require('../util/is-auth'); //authorization middleware

//READ ALL BOOKS -> [GET] ../books
router.get('/', controller.getAll);//get secret book

//READ ONE BOOK -> [GET] ../books/id
// router.get('/:id', controller.getOne);
router.get('/mybook', isAuth, controller.getOne); //Get the private resource on decoded token

//CREATE ONE BOOK -> [POST] ../books
router.post('/', controller.createOne); //should not be available in prod

//UPDATE ONE BOOK -> [PUT] ../books/id
// router.put('/:id', controller.updateOne);
router.put('/', isAuth, controller.updateOne); //Modify private resource on decoded token 

//DELETE ONE BOOK -> [DELETE] ../books/id
router.delete('/:id', controller.deleteOne); //should not be available in prod

module.exports = router;