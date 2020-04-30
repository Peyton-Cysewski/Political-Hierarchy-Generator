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
    console.log('Connected to database in login.js');
  }
});

exports.login = function(request, response) {
  // console.log(request.query);

  let SQL = 'SELECT id FROM users WHERE user_name=$1 AND user_password=$2;';
  let values = [request.query.username, request.query.password];

  dbClient.query(SQL, values).then(dbRes => {
    // console.log(dbRes.rows);
    response.render('home', { loggedIn: true, user_id: dbRes.rows[0].id, user_name: request.query.username });
  }).catch(error => {
    console.log(error);
    response.render('error', { message: 'Sorry, you entered the wrong username or password', loggedIn: false, user_id: null, user_name: null });
  });
};

