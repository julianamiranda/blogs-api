const { Router } = require('express');
const mdw = require('../middlewares/validateUser');
const tk = require('../middlewares/validateToken');
const userController = require('../controllers/userController');

const user = Router();

user.get('/', tk.validateToken, userController.getAll);
user.post('/', mdw.validateUser, userController.create);

module.exports = user;