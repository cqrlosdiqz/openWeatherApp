const axios = require('axios');

const apiConnection = async (city) => {
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.API_KEY}`;

  try {
    const res = await axios(url);
    const result = {
      city: res.data.name,
      temp: res.data.main.temp,
    };
    return result;
  } catch (err) {
    return err;
  }
};

module.exports = apiConnection;
