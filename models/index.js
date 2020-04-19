// ============ IMPORTS
const mongoose = require('mongoose');

// ============ CONNECT
const connectionString = 'mongodb://localhost:27017/full-stack-hw';

// ------------ Config, Promises
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Successfully connected to MongoDB lab db');
  })
  .catch((err) => {
    console.log(err);
  });

// =========== EXPORTS
module.exports = {
  Bird: require('./Bird')
}