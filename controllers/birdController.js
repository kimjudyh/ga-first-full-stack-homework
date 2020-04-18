// =========== IMPORTS
const express = require('express');
const router = express.Router();

// =========== MODELS
const db = require('../models');

// =========== ROUTES
// Index route
router.get('/', (req, res) => {
  res.send("Bird Index");
});

// =========== EXPORTS
module.exports = router;