const express = require('express');
const gameController = require('../controllers/gamesController');
const userController = require('../controllers/userController');

const router = express.Router();

/* GET home page. */
router.get('/', gameController.homePage);

router.get('/games', gameController.getGames);
router.get('/filldata', gameController.fillData);
router.get('/playgame', gameController.play);

router.get('/admin', gameController.admin);
router.get('/admin/delete/:id', gameController.deleteGame);
router.get('/admin/edit/:id', gameController.editGame);
router.post('/admin/edit/:id', gameController.updateGame);

router.get('/add', gameController.addGame);
router.post('/add', gameController.createGame);

router.get('/register', userController.register);
router.get('/login', userController.login);

module.exports = router;
