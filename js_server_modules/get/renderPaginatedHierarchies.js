'use strict';

// DEPENDENCIES
require('dotenv').config();
const pg = require('pg');
const dbClient = new pg.Client(process.env.DATABASE_URL);

dbClient.connect(error => {
  if (error) {
    console.log('Something went wrong with the Database: ' + error);
  } else {
    console.log('Connected to database in renderPaginatedHierachies.js');
  }
});

function Person(tierName, maleTitle, femaleTitle, description, person) {
  this.tierName = tierName;
  if (person.sex === 'male') {
    this.title = maleTitle + ' ' +person.name;
  } else if (person.sex === 'female') {
    this.title = femaleTitle + ' ' + person.name;
  }
  this.description = description;
}

exports.renderPaginatedHierarchies = function(request, response){
  let spliced = request.params.data.split('+');

  let user_name = spliced[1];
  let hierarchyId = spliced[0];
  let query = `SELECT * FROM hierarchy WHERE id = $1;`;
  let values = [hierarchyId];
  dbClient.query(query, values)
    .then(responseData => {
      // console.log(responseData.rows[0]);
      // console.log(JSON.parse(responseData.rows[0].tier_name_array));

      let user_id = responseData.rows[0].user_id;
      // METADATA TO BUILD RULER ARRAY
      let creationName = responseData.rows[0].creation_name;
      let politicsId = responseData.rows[0].politics_id;
      let tier1Number = responseData.rows[0].tier_number_array[0];
      let tier2Number = responseData.rows[0].tier_number_array[1];
      let tier3Number = responseData.rows[0].tier_number_array[2];
      let nameArray = JSON.parse(responseData.rows[0].tier_name_array);

      // GOVERNMENT SPECIFIC DATA
      let selectQuery = `SELECT * FROM politics WHERE id=$1;`;
      let selectValues = [politicsId];
      dbClient.query(selectQuery, selectValues)
        .then(dbRes => {
          let govData = dbRes.rows[0];

          // BULIDING THE FULL ARRAY THAT REPRESENTS THE HIERARCHY
          let ruler = [];
          ruler.push(new Person(govData.government, govData.ruler_male_title, govData.ruler_female_title, govData.government_description, nameArray[0]));
          for (let i = 0; i < tier1Number; i++) {
            let tier1 = [];
            tier1.push(new Person(govData.tier1, govData.tier1_male_title, govData.tier1_female_title, govData.tier1_description, nameArray[ 1 + i ]));
            for (let j = 0; j < tier2Number; j++) {
              let tier2 = [];
              tier2.push(new Person(govData.tier2, govData.tier2_male_title, govData.tier2_female_title, govData.tier2_description, nameArray[ (1 + tier1Number) + (i * tier2Number) + j ]));
              let tier3 = [];
              for (let k = 0; k < tier3Number; k++) {
                tier3.push(new Person(govData.tier3, govData.tier3_male_title, govData.tier3_female_title, govData.tier3_description, nameArray[ (1 + tier1Number + (tier1Number * tier2Number)) + (i * tier2Number * tier3Number) + (j * tier3Number) + k ]));
              }
              tier2.push(tier3);
              tier1.push(tier2);
            }
            ruler.push(tier1);
          }
          // RENDER STATEMENT HERE
          response.render('paginatedHierarchies', { rulerArray: ruler, creationName: creationName, loggedIn: true, user_id: user_id, user_name: user_name });
        }).catch(error => {
          console.log(error);
        });
    }).catch(error => {
      console.log(error);
    });
};

