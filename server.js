// ============ IMPORTS
const express = require('express');
const app = express();

// =========== VIEW ENGINE

// =========== CONTROLLERS

// =========== MIDDLEWARE

// ---------- Custom Middleware

// =========== ROUTES
app.get('/', (req, res) => {
  res.send('Welcome to the homepage');
});

// =========== PORT LISTENER
app.listen(4500, () => {
  console.log('Server running at port 4500');
});