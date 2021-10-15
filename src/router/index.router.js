const apiConnection = require('../utils/apiCall');

const route = require('express').Router();

route.get('/', (req, res) => {
  // NEW CODE
  res.render('index');
});

route.post('/', async (req, res) => {
  const { city } = req.body;
  try {
    const weather = await apiConnection(city);
   
    if (weather.main === undefined) {
      res.render('index', { weather: null, error: 'Error, please try again' });
    } else {
      const weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
      res.render('index', { weather: weatherText, error: null });
    }
  } catch (error) {
    res.render('index', { weather: null, error: 'Error, please try again' });
  }
});

module.exports = route;
