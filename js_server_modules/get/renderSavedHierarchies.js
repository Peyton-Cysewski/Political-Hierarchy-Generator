'use strict';

// DEPENDENCIES
require('dotenv').config();
const pg = require('pg');
const dbClient = new pg.Client(process.env.DATABASE_URL);

exports.renderSavedHierarchies = function(request, response) {
  let data = req.params.userdata.split('+');

  let SQL = 'SELECT creation_name FROM hierarchy WHERE user_id=$1;';
  let values = [user_id];
  dbClient.query(SQL, values).then(dbRes => {
    let creationList = dbRes.rows;
    response.render('savedHierarchies', { creationList: creationList, loggedIn: true, user_id: data[0], user_name: data[1] });
  })
}