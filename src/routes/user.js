const { Router } = require('express');
const mdw = require('../middlewares/validateUser');
const userController = require('../controllers/userController');

const user = Router();

user.post('/', mdw.validateUser, userController.create);

module.exports = user;