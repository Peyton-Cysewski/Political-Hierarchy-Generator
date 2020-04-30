// request.body.tier1
// request.body.tier2
// request.body.tier3
// request.body.government
// request.body.gender
// (request.body.culture

'use strict';
// the following code is for testing only
require('dotenv').config();
const express = require('express');
const app = express();
app.set('view engine', 'ejs');
// Global Variables
// let nameArray = [];

// the above code is for testing purpose only

const superagent = require('superagent');

const pg = require('pg');

const dbClient = new pg.Client(process.env.DATABASE_URL);

dbClient.connect(error => {

  if (error) {
    console.log('Something went wrong with the Database: ' + error);
  } else {
    console.log('Connected to database');
  }
});
//
function errorHandler(error, request, response) {
  response.status(500).send('Something went wrong: ' + error);
}

function determineGender(request) {
  let gender = '';
  let genderBias = 0.3;//request.body.gender;
  let genderRoll = Math.random();
  if (genderRoll < genderBias) {
    gender = 'male';
  } else {
    gender = 'female';
  }
  return gender;
}

function determineCulture(request) {
  let culture = 'german_germany';
  // if (request.body.culture === 'german') {

  //   culture = 'german_germany';
  // } else if (request.body.culture === 'greek') {
  //   culture = 'greek-greece';
  // } else if (request.body.culture === 'japanese') {
  //   culture = 'japanese-japan';
  // } else {
  //   culture = 'slovak-slovakia';
  // }
  return culture;
}

// function nameGenerator(request, response) {
//   let gender = determineGender(.3); //(request);
//   const culture = determineCulture('japeneese');//(request);
//   const url =`https://api.namefake.com/${culture}/${gender}`;
//   let person;
//   superagent.get(url).then(res => {
//     let result = JSON.parse(res.text);
//     person = {
//       name: result.name,
//       sex: gender,
//     };
//     nameArray.push(person);
//   }).catch(error => {
//     errorHandler(error, request, response);
//   });
//   console.log('does this run? ' +person);
// }



// let testArray = ['king', 'duke', 'duke', 'baron', 'baron', 'baron', 'baron', 'count', 'count', 'count', 'count','count', 'count', 'count', 'count'];

// let ownedbyRuler = testArray.map( (tier1Person, index) => ) 




// exports.createHierarchy = function(request, response) {
function createHierarchy (request, response) {

  let nameArray = [];
  let promisesArr = [];
  let tier1Number = 1; //request.body.tier1;
  let tier2Number = 1; //request.body.tier2;
  let tier3Number = 1; //request.body.tier3;
  let declaredGovernment = 1; //request.body.government;
  // let totalNumberOfPeople = tier1Number * tier2Number * tier3Number + 1;
  let totalNumberOfPeople = 1 + tier1Number + (tier1Number * tier2Number) + (tier1Number * tier2Number * tier3Number);

  let selectQuery = `SELECT * FROM politics WHERE id=$1;`;
  let selectValues = [declaredGovernment];

  dbClient.query(selectQuery, selectValues)
    .then(result => {
      // console.log(result.rows[0]);
      let data = result.rows[0];
      return data;
    }).then(data => {
      // console.log(totalNumberOfPeople + ' total people');
      for (let i = 0; i < totalNumberOfPeople; i++) {
        // let newPerson = nameGenerator('request', 'response');
        let gender = determineGender(.3); //(request);
        const culture = determineCulture('static in function');//(request);
        const url =`https://api.namefake.com/${culture}/${gender}`;
        promisesArr.push(superagent.get(url));
      }
      Promise.all(promisesArr).then(responseArray =>{
        responseArray.forEach( results => {
          let result = JSON.parse(results.text);
          let person = {
            name: result.name,
            sex: result.pict.slice(result.pict.search(/[a-z]/i))
          };
          console.log(person.name +'  '+ person.sex);
          // console.log(result.pict);
          nameArray.push(person);
          let object = {
            nameArray: nameArray,
            data: data,
          }
          console.log
          return object;
        });
      }).then(object => {

        // let nameArray = object.nameArray;
        let data = object.data;

        let tier1Array =[];
        let tier2Array =[];
        let tier3Array =[];
        nameArray.forEach( (person, index) => {
          // console.log(person +' at line 122');
          let title = '';
          let personName = '';
          let titleAndNameGender = '';
          console.log(index);
          console.log(person.sex);
          if (index === 0 && person.sex === 'male') {
            title = data.ruler_male_title;
            personName = person.name;
            titleAndNameGender = title + ' ' + personName + ' (' + person.sex + ')';

          } else if (index === 0 && person.sex === 'female') {
            title = data.ruler_female_title;
            personName = person.name;
            titleAndNameGender = title + ' ' + personName + ' (' + person.sex + ')';
    
          } else if (index > 0 && index <= tier1Number && person.sex === 'male') {
            title = data.tier1_male_title;
            personName = person.name;
            titleAndNameGender = title + ' ' + personName + ' (' + person.sex + ')';
            tier1Array.push(titleAndNameGender);
    
          } else if (index > 0 && index <= tier1Number && person.sex === 'female') {
            title = data.tier1_female_title;
            personName = person.name;
            titleAndNameGender = title + ' ' + personName + ' (' + person.sex + ')';
            tier1Array.push(titleAndNameGender);
          } else if (index > tier1Number && index <= (tier1Number * tier2Number) && person.sex === 'male') {
            title = data.tier2_male_title;
            personName = person.name;
            titleAndNameGender = title + ' ' + personName + ' (' + person.sex + ')';
            tier2Array.push(titleAndNameGender);
          } else if (index > tier1Number && index <= (tier1Number * tier2Number)&& person.sex === 'female') {
            title = data.tier2_female_title;
            personName = person.name;
            titleAndNameGender = title + ' ' + personName + ' (' + person.sex + ')';
            tier2Array.push(titleAndNameGender);
          } else if (index > (tier1Number * tier2Number) && person.sex === 'male') {
            title = data.tier3_male_title;      personName = person.name;
            titleAndNameGender = title + ' ' + personName + ' (' + person.sex + ')';
            tier3Array.push(titleAndNameGender);
          } else if (index > (tier1Number * tier2Number) && person.sex === 'female') {
            title = data.tier3_female_title;
            titleAndNameGender = title + ' ' + personName + ' (' + person.sex + ')';
            tier3Array.push(titleAndNameGender);
          }
        });
        console.log('this is the 1 Array'+tier1Array);
        console.log('this is the 2 Array'+tier2Array);
        console.log('this is the 3 Array'+tier3Array);
        // console.log(nameArray);
        response.render('result', {
          king:nameArray[0],
          tier1:tier1Array,
          tier2:tier2Array,
          tier3:tier3Array,
        });
      });
    });
}

app.get('/', createHierarchy);

// the following code is for testing propose only
app.listen(3000);





// Alternate Idea

// exports.createHierarchy = function(request, response) {
//   let tier1Number = request.body.tier1;
//   let tier2Number = request.body.tier2;
//   let tier3Number = request.body.tier3;
//   let declaredGovernment = request.body.government;
//   let totalNumberOfPeople = 1 + tier1Number + (tier1Number * tier2Number) + (tier1Number * tier2Number * tier3Number);

//   let nameArray = [];
//   let govData;
  
//
//   let selectQuery = `SELECT * FROM politics WHERE government=$1;`;
//   let selectValues = [declaredGovernment];
//   dbClient.query(selectQuery, selectValues)
//   .then(dbRes => {
//     govData = dbRes.rows;
//   });
//   // console.log(govData);
    
//   for (let i = 0; i < totalNumberOfPeople; i++) {
//     let newPerson = nameGenerator(request);
//     nameArray.push(newPerson);
//   }
//   // console.log(nameArray);

//   let rulerTier = [];
//   ruler.push(new Person(govData.government, govData.ruler_male_title, govData.ruler_female_title, govData.government_description, nameArray[0]));
//   for (let i = 0; i < tier1Number; i++) {
//     let tier1 = [];
//     tier1.push(new Person(govData.tier1, govData.tier1_male_title, govData.tier1_female_title, govData.tier1_description, nameArray[ 1 + i ]));
//     for (let j = 0; j < tier2Number; j++) {
//       let tier2 = [];
//       tier2.push(new Person(govData.tier2, govData.tier2_male_title, govData.tier2_female_title, govData.tier2_description, nameArray[ (1 + tier1Number) + (i * tier2Number) + j ]));
//       let tier3 = [];
//       for (let k = 0; k < tier3Number; k++) {
//         tier3.push(new Person(govData.tier3, govData.tier3_male_title, govData.tier3_female_title, govData.tier3_description, nameArray[ (1 + tier1Number + (tier1Number * tier2Number)) + (i * tier2Number * tier3Number) + (j * tier3Number) + k ]));
//       }
//       tier2.push(tier3);
//       tier1.push(tier2);
//     }
//     ruler.push(tier1);
//   }
//   return rulerTier;
// };

// function Person(role, maleTitle, femaleTitle, description, person) {
//   this.title = role;
//   if (person.sex === 'male') {
//     this.name = maleTitle + person.name;
//   } else if (person.sex === 'female') {
//     this.name = femaleTitle + person.name;
//   }
//   this.description = description;
//