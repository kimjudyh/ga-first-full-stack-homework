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
  //console.log(db.Bird);
  //console.log(req.body.seen);
  db.Bird.create({
    name: req.body.name,
    color: req.body.color,
    seen: [{
      location: req.body.location,
      date: req.body.date
    }],
    image: req.body.image
  }, (err, newBird) => {
    if (err) {
      console.log(err);
      res.redirect('/');
    }
    res.redirect('/birds');
  });
});

// ----------- Dynamic Routes
// Show route
router.get('/:id', (req, res) => {
  res.render('show', {
    bird: foundBird,
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