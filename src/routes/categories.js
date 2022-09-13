const { Router } = require('express');
const tk = require('../middlewares/validateToken');
const mdw = require('../middlewares/validateCategory');
const catController = require('../controllers/catController');

const categories = Router();

categories.get('/', tk.validateToken, catController.getAll);
categories.post('/', tk.validateToken, mdw.validateCategory, catController.create);

module.exports = categories;