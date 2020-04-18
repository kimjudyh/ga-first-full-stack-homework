// ============ IMPORTS
const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const app = express();

// =========== VIEW ENGINE
app.set('view engine', 'ejs');

// =========== CONTROLLERS

// =========== MIDDLEWARE
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(express.static('public'));

// ---------- Custom Middleware
app.use((req, res, next) => {
  console.log(`Request received ${req.url}`);
  next();
})

// =========== ROUTES
app.get('/', (req, res) => {
  res.send('Welcome to the homepage');
});

// =========== PORT LISTENER
app.listen(4500, () => {
  console.log('Server running at port 4500');
});