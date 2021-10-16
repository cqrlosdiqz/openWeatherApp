const apiConnection = require('../utils/apiCall');
const LogModel = require('../models/Log');

const route = require('express').Router();

route.get('/', (req, res) => {
  res.render('index');
});

route.post('/', async (req, res) => {
  const { city } = req.body;

  try {
    const log = await LogModel.findOne({ city });
    if (!log) {
      const search = await apiConnection(city);
      if (search instanceof Error) throw new Error();
      const newLog = new LogModel({ city: search.city, temp: search.temp });
      await newLog.save();
      const weatherText = `It's ${search.temp} degrees in ${search.city}!`;
      return res.render('index', { weather: weatherText, error: null });
    } else {
      
      //Return true if last log was less than two hours ago
      if (!log.nearLog(new Date())) {
        const search = await apiConnection(city);
        if (search instanceof Error) throw new Error();

        const logUpdated = await LogModel.findOneAndUpdate(
          { _id: log._id },
          {
            temp: search.temp,
            date: new Date(),
          },
          { new: true }
        );
        const weatherText = `It's ${logUpdated.temp} degrees in ${logUpdated.city}!`;
        return res.render('index', { weather: weatherText, error: null });
      }

      const weatherText = `It's ${log.temp} degrees in ${log.city}!`;
      return res.render('index', { weather: weatherText, error: null });
    }
  } catch (error) {
    res.render('index', { weather: null, error: 'Error, please try again' });
  }
});

module.exports = route;
