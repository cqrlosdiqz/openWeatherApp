const mongoose = require('mongoose');

mongoose
  .connect(process.env.URI_DB)
  .then(() => {
    console.log('Connect MongoDB');
  })
  .catch((err) => {
    console.error(err);
  });
