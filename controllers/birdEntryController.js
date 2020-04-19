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
entryRouter.get('/:id/entry/:entryId/edit', (req, res) => {
  db.Bird.findOne({_id: req.params.id, seen: {$elemMatch: {_id: req.params.entryId}}},
     (err, foundBird) => {
    if (err) {
      console.log(err); res.redirect('/');
    }
    console.log(foundBird);
    res.render('editEntry', {
      id: req.params.id,
      entry: foundBird.seen.id(req.params.entryId),
      entryId: req.params.entryId,
    });
  })
})

// PUT update route
entryRouter.put('/:id/entry/:entryId', (req, res) => {
  let entryId = req.params.entryId;
  console.log(req.body);
  db.Bird.findByIdAndUpdate(req.params.id, {  }, () => {})
  db.Bird.findOneAndUpdate(
    { _id: req.params.id, "seen._id": entryId },
    {
      $set: {
        "seen.$":
        {
          date: req.body.date,
          location: req.body.location,
          notes: req.body.notes,
        }
      }
    },
    { arrayFilters: [{ element: entryId }],
     new: true },
  (err, foundBird) => {
    if (err) {
      console.log(err); res.redirect('/');
    }
    console.log('found bird for entry', foundBird);
    res.redirect(`/birds/${req.params.id}`);
  })
})

// =========== EXPORTS
module.exports = entryRouter;