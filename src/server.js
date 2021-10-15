const express = require('express');
require('dotenv').config()
const morgan = require('morgan');
const path = require('path');


const server = express();

//Setting
const port = process.env.PORT || 8080;
server.set('view engine', 'pug');
server.set('views', path.join(__dirname, 'views'));

//Middleware
server.use(morgan('dev'));
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

//Router
server.use(require('./router/index.router'));


//Static filex
server.use(express.static(path.join(__dirname, '..', 'public')));

server.listen(port, () => {
  console.log(`Server on port ${port}`);
});
