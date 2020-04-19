// ============= IMPORTS
const mongoose = require('mongoose');

// ============= SCHEMA
const BirdSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  seen: [
    {
      location: {type: String, required: true},
      date: {type: String},
    },
  ],
  image: {
    type: String,
  },
});

// ============ CREATE MODEL
const Bird = mongoose.model('Bird', BirdSchema);

// ============ EXPORT
module.exports = Bird;