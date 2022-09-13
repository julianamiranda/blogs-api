const { Router } = require('express');
const tk = require('../middlewares/validateToken');
const postController = require('../controllers/postController');

const post = Router();

post.get('/', tk.validateToken, postController.getAll);
post.get('/:id', tk.validateToken, postController.getById);

module.exports = post;