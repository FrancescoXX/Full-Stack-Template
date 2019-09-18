//Generic Route file for Publics API CRUD Operations
const controller = require('../controllers/publics');
const router = require('express').Router();

//READ ALL PUBLICS -> [GET] ../publics
router.get('/', controller.getAll);

//READ ONE USER -> [GET] ../publics/id
router.get('/:id', controller.getOne);

//CREATE ONE USER -> [POST] ../publics
router.post('/', controller.createOne);

//UPDATE ONE USER -> [PUT] ../publics/id
router.put('/:id', controller.updateOne);

//DELETE ONE USER -> [DELETE] ../publics/id
router.delete('/:id', controller.deleteOne);

module.exports = router;