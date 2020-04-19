// =========== IMPORTS
const express = require('express');
const router = express.Router();

// =========== MODELS
const db = require('../models');

// =========== ROUTES
// Index route
router.get('/', (req, res) => {
  res.render('index', {
    birds: [],
  });
});

// GET new route
router.get('/new', (req, res) => {
  res.render('new');
});

// POST create route

// ----------- Dynamic Routes
// Show route

// GET edit route

// PUT update route

// DELETE destroy route


// =========== EXPORTS
module.exports = router;