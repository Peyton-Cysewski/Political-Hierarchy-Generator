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
  // console.log(request.body);
  // let raw = request.body;
  // console.log(data.id);

  // let user_id = request.body.id;

  let SQL = 'SELECT metadata FROM temp;';
  dbClient.query(SQL).then(dbRes => {
    // console.log(dbRes);
    // let data = dbRes.rows[0].metadata;
    // console.log(typeof(data));
    // let insertQuery
    // dbClient.query
    // console.log(JSON.parse(dbRes.rows[0].metadata));
    let data = JSON.parse(dbRes.rows[0].metadata);
    return data;
  }).then(data => {
    // console.log(data);
    let SQL = 'INSERT INTO hierarchy (user_id, creation_name, politics_id, tier_number_array, tier_name_array) VALUES ($1, $2, $3, $4, $5);';
    let values = [data.user_id, data.creation_name, data.politics_id, data.tier_number_array, data.tier_name_array];
    dbClient.query(SQL, values).then(()=>{
      response.status(204).send();
    }).catch(error => {
      console.log('Database Insertion Error: ' + error);
    });
  }).catch(error => {
    console.log('Database Selection Error: ' + error);
  });
};

