const { Router } = require('express');
const mdw = require('../middlewares/validateLogin');
const loginController = require('../controllers/loginController');

const login = Router();

login.post('/', mdw.validateLogin, loginController.login);

module.exports = login;