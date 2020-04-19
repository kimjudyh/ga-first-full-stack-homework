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
router.post('/', (req, res) => {
  res.send(req.body);
});

// ----------- Dynamic Routes
// Show route
router.get('/:id', (req, res) => {
  res.render('show', {
    id: req.params.id
  });
});

// GET edit route
router.get('/:id/edit', (req, res) => {
  console.log(req.params.id)
  res.render('edit', {
    id: req.params.id
  });
})

// PUT update route
router.put('/:id', (req, res) => {
  res.redirect(`/birds/${req.params.id}`);
})

// DELETE destroy route
router.delete('/:id', (req, res) => {
  // remove
})


// =========== EXPORTS
module.exports = router;