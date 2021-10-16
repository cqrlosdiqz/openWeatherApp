const { model, Schema } = require('mongoose');

const logSchema = new Schema({
  city: String,
  temp: String,
  date: {
    default: new Date(),
    type: Date,
  },
});

logSchema.methods.nearLog = function (currentDate) {
  return currentDate.getTime() < this.date.getTime() + 2 * 60 * 60 * 1000
    ? true
    : false;
};

module.exports = model('LogModel', logSchema);
