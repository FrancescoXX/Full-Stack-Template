const controller = require('../controllers/auth');
const router = require('express').Router();

router.post('/token', controller.token); //Returns token

module.exports = router;