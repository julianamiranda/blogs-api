const express = require('express');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use('/login', routes.login);
app.use('/user', routes.user);
app.use('/post', routes.post);
app.use('/categories', routes.categories);
// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
