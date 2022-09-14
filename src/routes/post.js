const { Router } = require('express');
const tk = require('../middlewares/validateToken');
const pt = require('../middlewares/validatePost');
const postController = require('../controllers/postController');

const post = Router();

post.get('/', tk.validateToken, postController.getAll);
post.get('/:id', tk.validateToken, postController.getById);
post.delete('/:id', tk.validateToken, postController.remove);
post.post('/', tk.validateToken, pt.validatePost, postController.create);
post.put('/:id', tk.validateToken, pt.validateUpdate, postController.update);

module.exports = post;