// controller for Bird Seen Entries
// Bird: {.. seen: [{location: x, date: y, notes: z}, {..}]}

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
  // trying out another way of finding by id AND subdocument id
  db.Bird.findOne({_id: req.params.id, seen: {$elemMatch: {_id: req.params.entryId}}},
     (err, foundBird) => {
    if (err) {
      console.log(err); res.redirect('/');
    }
    res.render('editEntry', {
      id: req.params.id,
      bird: foundBird,
      // seen is a subdocument in the Bird model
      // seen: [{_id}, {_id}, {_id}]
      // get the object in seen array that matches specific _id
      entry: foundBird.seen.id(req.params.entryId),
      entryId: req.params.entryId,
    });
  })
})

// PUT update route
entryRouter.put('/:id/entry/:entryId', (req, res) => {
  let entryId = req.params.entryId;
  db.Bird.findOneAndUpdate(
    // filter
    { _id: req.params.id, "seen._id": entryId },
    // object to update
    {
      $set: {
        // use positional $ to update subdocument with specified id 
        "seen.$":
        {
          date: req.body.date,
          location: req.body.location,
          notes: req.body.notes,
        }
      }
    },
    // return updated object
    { new: true },
    (err, foundBird) => {
      if (err) {
        console.log(err); res.redirect('/');
      }
      res.redirect(`/birds/${req.params.id}`);
    })
})

// =========== EXPORTS
module.exports = entryRouter;