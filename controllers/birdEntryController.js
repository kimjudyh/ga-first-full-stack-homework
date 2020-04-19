// controller for Bird Seen Entries

// ========== IMPORTS
const express = require('express');
const entryRouter = express.Router();

// ========== MODELS
const db = require('../models');

// ========== ROUTES
// GET new route
entryRouter.get('/:id/entry/new', (req, res) => {
  console.log(req.params.id);
  res.render('newEntry', {
    id: req.params.id
  });
})

// POST create route
entryRouter.post('/:id/entry', (req, res) => {
  console.log(req.params);
  console.log(req.body);
  db.Bird.findByIdAndUpdate(
    req.params.id,
    {
      $push: {
        seen: {
          location: req.body.location,
          date: req.body.date,
          notes: req.body.notes,
        }
      }
    },
    {upsert: true},
    (err, update) => {
      if (err) {
        console.log(err); res.redirect('/');
      }
      res.redirect(`/birds/${req.params.id}`);
    })
})

// GET edit route

// PUT update route

// =========== EXPORTS
module.exports = entryRouter;