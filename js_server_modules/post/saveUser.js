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

  let selectSQL = 'SELECT * FROM users WHERE user_name=$1;';
  let selectValue = [request.body.username];

  dbClient.query(selectSQL, selectValue).then(dbRes => {
    console.log(dbRes.rows);
    if (dbRes.rows[0]) {
      response.render('error', { message: 'User Name Is in Use; Please Choose New User Name.', loggedIn: false, user_id: null, user_name: null });
    } else {
      let insertSQL = 'INSERT INTO users (user_name, user_password) VALUES ($1, $2) RETURNING *;';
      let insertValues = [request.body.username, request.body.password];

      dbClient.query(insertSQL, insertValues).then(dbRes => {
        // console.log(dbRes.rows[0]);
        response.render('home', { loggedIn: true, user_id: dbRes.rows[0].id, user_name: dbRes.rows[0].user_name });
      });
    }
  });
};


