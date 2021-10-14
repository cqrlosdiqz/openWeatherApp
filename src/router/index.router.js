const route = require('express').Router();

route.get('/', (req, res) => {
  // NEW CODE
  res.render('index');
});

route.post('/', (req, res) => {
  console.log(req.body);
  res.render('index');
 
});

module.exports = route;
