'use strict';

// DEPENDENCIES
require('dotenv').config();
const pg = require('pg');
const dbClient = new pg.Client(process.env.DATABASE_URL);
dbClient.connect(error => {
  if (error) {
    console.log('Something went wrong with the Database: ' + error);
  } else {
    console.log('Connected to database in deleteSavedHierachies.js');
  }
});

exports.deleteSavedHierarchies = function(request, response) {
  let data = request.params.userdata.split('+');
  console.log(data);
  let deleteQuery =  `DELETE FROM hierarchy WHERE id=$1 AND creation_name=$2;`;
  let values = [data[0],data[2]];
  dbClient.query(deleteQuery,values)
    .then(()=>{
      let SQL = 'SELECT creation_name, id FROM hierarchy WHERE user_id=$1;';
      let values = [data[1]];
      dbClient.query(SQL, values).then(dbRes => {
        let creationList = dbRes.rows;
        console.log('creationList is ', creationList);
        response.render('savedHierarchies', { creationList: creationList, loggedIn: true, user_id: data[1], user_name: data[3] });
      }).catch(error=>{
        console.log('trouble re-rending user\'s saved hierarchies: ', error);
      });
    }).catch(error => {
      console.log('Trouble deleting user\'s saved hierarchies: ', error);
    });
};
