'use strict';

// DEPENDENCIES
require('dotenv').config();
const pg = require('pg');
const dbClient = new pg.Client(process.env.DATABASE_URL);
dbClient.connect(error => {
  if (error) {
    console.log('Something went wrong with the Database: ' + error);
  } else {
    console.log('Connected to database in renderSavedHierachies.js');
  }
});

exports.renderSavedHierarchies = function(request, response) {
  let data = request.params.userdata.split('+');
  let SQL = 'SELECT creation_name, id, user_id FROM hierarchy WHERE user_id=$1;';
  let values = [data[0]];
  dbClient.query(SQL, values).then(dbRes => {
    let creationList = dbRes.rows;
    response.render('savedHierarchies', { creationList: creationList, loggedIn: true, user_id: data[0], user_name: data[1] });
  }).catch(error => {
    console.log('Trouble finding user\'s saved hierarchies: ', error);
  });
};
