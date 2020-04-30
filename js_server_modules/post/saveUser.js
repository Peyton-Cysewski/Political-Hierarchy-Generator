'use strict';

// DEPENDENCIES
require('dotenv').config();
const pg = require('pg');
const methodOverride = require('method-override');
const dbClient = new pg.Client(process.env.DATABASE_URL);

// DEPENDENCY INTEGRATION
// app.use(methodOverride('_method'));

// DATABASE CONNECTION
dbClient.connect(error => {
  if (error) {
    console.log('Something went wrong with the database connection: ' + error);
  } else {
    console.log('Connected to database in saveUser.js');
  }
});

exports.saveUser = function(request, response) {
  // console.log(request.body);

  let SQL = 'INSERT INTO users (user_name, user_password) VALUES ($1, $2) RETURNING *;';
  let values = [request.body.username, request.body.password];

  dbClient.query(SQL, values).then(dbRes => {
    // console.log(dbRes.rows[0]);
    response.render('home', { loggedIn: true, user_id: dbRes.rows[0].id, user_name: dbRes.rows[0].user_name })
  })
}