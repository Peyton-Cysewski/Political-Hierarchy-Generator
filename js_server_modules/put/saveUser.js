'use strict';

// DEPENDENCIES
require('dotenv').config();
const pg = require('pg');
const methodOverride = require('method-override');
const dbClient = new pg.Client(process.env.DATABASE_URL);

// DEPENDENCY INTEGRATION
app.use(methodOverride('_method'));

// DATABASE CONNECTION
dbClient.connect(error => {
  if (error) {
    console.log('Something went wrong with the database connection: ' + error);
  } else {
    console.log('Connected to database');
  }
});

