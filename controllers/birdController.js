// =========== IMPORTS
const express = require('express');
const router = express.Router();
const birdEntryController = require('./birdEntryController');

// =========== MODELS
const db = require('../models');

// =========== ROUTES
// Index route
router.get('/', (req, res) => {
  // find all birds in collection
  db.Bird.find({}, (err, allBirds) => {
    if (err) {
      console.log(err);
      res.redirect('/');
    }
    res.render('index', {
      birds: allBirds,
    });
  })
});

// GET new route
router.get('/new', (req, res) => {
  // render new form to make new bird
  res.render('new');
});

// POST create route
router.post('/', (req, res) => {
  // create new entry in collection using request sent from new form
  db.Bird.create({
    name: req.body.name,
    color: req.body.color,
    // structure request data to match schema
    seen: [{
      location: req.body.location,
      date: req.body.date,
      notes: req.body.notes
    }],
    image: req.body.image
  }, (err, newBird) => {
    if (err) {
      console.log(err);
      res.redirect('/');
    }
    // send back to birds index
    res.redirect('/birds');
  });
});

// ----------- Dynamic Routes
// Show route
router.get('/:id', (req, res) => {
  // show specific bird using its ID from database
  db.Bird.findById(req.params.id, (err, foundBird) => {
    if (err) {
      console.log(err);
      res.redirect('/');
    }
    res.render('show', {
      bird: foundBird,
      id: req.params.id
    });
  })
});

// GET edit route
router.get('/:id/edit', (req, res) => {
  // find bird by id, render edit form
  console.log(req.params.id)
  db.Bird.findById(req.params.id, (err, foundBird) => {
    if (err) {
      console.log(err); res.redirect('/');
    }
    res.render('edit', {
      bird: foundBird,
      id: req.params.id
    });
  })
})

// PUT update route
router.put('/:id', (req, res) => {
  // update bird with specific ID in database
  db.Bird.findByIdAndUpdate(
    req.params.id,  // which id to search by
    {
      name: req.body.name,
      color: req.body.color,
      image: req.body.image
    }, // object to update
    {new: true},  // get update record back
    (err, updatedBird) => {
      if (err) {
        console.log(err); res.redirect('/');
      }
      res.redirect(`/birds/${req.params.id}`);
    });
});

// DELETE destroy route
router.delete('/:id', (req, res) => {
  // remove bird with specified id from db
  db.Bird.findByIdAndDelete(req.params.id, (err, delBird) => {
    if (err) {
      console.log(err); res.redirect('/');
    }
    res.redirect('/birds');
  })
})

// use controller for entries specific to each bird
router.use('/', birdEntryController);

// =========== EXPORTS
module.exports = router;