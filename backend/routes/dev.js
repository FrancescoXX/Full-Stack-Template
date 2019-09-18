//Generic Route file for Dev API
const controller = require('../controllers/dev'); //Environment variable in .env file
const router = require('express').Router();

router.get('/config', controller.getConfig);
router.get('/package', controller.getPackJson);
router.get('/version', controller.getVersion);
router.get('/seq', controller.seq); //sequelize connection test
router.get('/test', controller.getTest); //test

module.exports = router;