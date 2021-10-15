const axios = require('axios');

const apiConnection = async (city) => {
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.API_KEY}`;

  try {
    const res = await axios(url);
    return res.data;
  } catch (err) {
    return new Error(err.message);
  }
};

module.exports = apiConnection;
