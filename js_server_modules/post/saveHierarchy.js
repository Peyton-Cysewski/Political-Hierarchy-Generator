'use strict';

// DEPENDENCIES
require('dotenv').config();
const pg = require('pg');
const dbClient = new pg.Client(process.env.DATABASE_URL);

dbClient.connect(error => {
  if (error) {
    console.log('Something went wrong with the Database: ' + error);
  } else {
    console.log('Connected to database in saveHierarchy.js');
  }
});

exports.saveHierarchy = function(request, response) {
  console.log(request.body);
  let raw = request.body;
  let data = JSON.parse(raw);
  console.log(data.id);
}