'use strict';

// DEPENDENCIES
require('dotenv').config();
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

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

function errorHandler(error, request, response) {
  response.status(500).send('Something went wrong: ' + error);
}

function determineGender(request) {
  let gender = '';
  let genderBias = request.body.gender;
  let genderRoll = Math.random();
  if (genderRoll < genderBias) {
    gender = 'male';
  } else {
    gender = 'female';
  }
  return gender;
}

function determineCulture(request) {
  let culture = '';
  if (request.body.culture === 'german') {
    culture = 'german_germany';
  } else if (request.body.culture === 'greek') {
    culture = 'greek-greece';
  } else if (request.body.culture === 'japanese') {
    culture = 'japanese-japan';
  } else {
    culture = 'slovak-slovakia';
  }
  return culture;
}


function Person(role, maleTitle, femaleTitle, description, person) {
  this.role = role;
  if (person.sex === 'male') {
    this.title = maleTitle + ' ' +person.name;
  } else if (person.sex === 'female') {
    this.title = femaleTitle + ' ' + person.name;
  }
  this.description = description;
}


// MAIN IMPORTANT FUNCTION
exports.createHierarchy = function(request, response) {
  // console.log(request.body);
  let tier1Number = parseInt(request.body.tier1);
  let tier2Number = parseInt(request.body.tier2);
  let tier3Number = parseInt(request.body.tier3);
  let declaredGovernment = request.body.government;
  let totalNumberOfPeople = 1 + tier1Number + (tier1Number * tier2Number) + (tier1Number * tier2Number * tier3Number);
  
  // console.log(declaredGovernment);

  let promises = [];
  // let govData;
  
  for (let i = 0; i < totalNumberOfPeople; i++) {
    sleep(100);
    console.log('Delay ' + i );
    let gender = determineGender(request); //(request);
    const culture = determineCulture(request); //(request);
    const url =`https://api.namefake.com/${culture}/${gender}`;
    promises.push(superagent.get(url)
    // ALTERNATE TO BELOW
    // .then(res => {
    //   // console.log(res);
    //   // console.log(people.map(person => JSON.parse(person.text).name));
    //   let name = JSON.parse(res.text).name;
    //   let gender = JSON.parse(res.text).pict;
    //   return {
    //     name: name,
    //     sex: gender.slice(gender.search(/[a-z]/i))
    //   }
    // })
    );
  }
  // console.log(promises);
  
  Promise.all(promises)
  .then(people => {
    // console.log(people);
    // console.log(people.map(person => JSON.parse(person.text).name));
    return people.map(person => {
      let name = JSON.parse(person.text).name;
      let gender = JSON.parse(person.text).pict;
      return {
        name: name,
        sex: gender.slice(gender.search(/[a-z]/i))
      }
    });
  })
  .then(nameArray => {
    // console.log(nameArray);
    let selectQuery = `SELECT * FROM politics WHERE government=$1;`;
    let selectValues = [declaredGovernment];
    dbClient.query(selectQuery, selectValues).then(dbRes => {
      // console.log(dbRes.rows[0]);
      let govData = dbRes.rows[0];
      
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
      // RENDER HERE
      // return ruler;
      // console.log(ruler);
      response.send(ruler);
      // response.render('result', ruler);
    }).catch(error => {
      console.log(error);
    });
  }).catch(error => {
    console.log(error);
  });
};




// ***** WELCOME TO THE GRAVEYARD ***** //




// function Person(role, maleTitle, femaleTitle, description, person) {
  //   this.title = role;
  //   if (person.sex === 'male') {
//     this.name = maleTitle + person.name;
//   } else if (person.sex === 'female') {
  //     this.name = femaleTitle + person.name;
//   }
//   this.description = description;
// }





// government ,
// ruler_male_title ,
// ruler_female_title ,
// government_description,
// tier1 , 
// tier1_male_title ,
// tier1_female_title ,
// tier1_description,
// tier2 ,
// tier2_male_title ,
// tier2_female_title ,
// tier2_description,
// tier3 , 
// tier3_male_title ,
// tier3_female_title ,
// tier3_description






// for (let i = 0; i < totalNumberOfPeople; i++) {
  //   let newPerson = nameGenerator(request);
  //   nameArray.push(newPerson);
  // }

  // let ruler = [];
  // ruler.push(new Person(govData.government, govData.ruler_male_title, govData.ruler_female_title, govData.government_description, nameArray[0]));
// for (let i = 0; i < tier1Number; i++) {
//   let tier1 = [];
//   tier1.push(new Person(govData.tier1, govData.tier1_male_title, govData.tier1_female_title, govData.tier1_description, nameArray[ 1 + i ]));
//   for (let j = 0; j < tier2Number; j++) {
  //     let tier2 = [];
//     tier2.push(new Person(govData.tier2, govData.tier2_male_title, govData.tier2_female_title, govData.tier2_description, nameArray[ (1 + tier1Number) + (i * tier2Number) + j ]));
//     let tier3 = [];
//     for (let k = 0; k < tier3Number; k++) {
  //       tier3.push(new Person(govData.tier3, govData.tier3_male_title, govData.tier3_female_title, govData.tier3_description, nameArray[ (1 + tier1Number + (tier1Number * tier2Number)) + (i * tier2Number * tier3Number) + (j * tier3Number) + k ]));
  //     }
//     tier2.push(tier3);
//     tier1.push(tier2);
//   }
//   ruler.push(tier1);
// }
// return ruler;







// function createArray(a,b,c) {
//   let ruler = [];
//   for (let i = 0; i < a; i++) {
  //     let tier1 = [];
//     for (let j = 0; j < b; j++) {
  //       let tier2 = [];
//       for (let k = 0; k < c; k++) {
  //       let tier3 = [];
//       tier2.push(tier3);
//       }
//       tier1.push(tier2);
//     }
//     ruler.push(tier1);
//   }
//   return ruler;
// }







// function nameGenerator(request, response) {
//   let gender = determineGender(request);
//   const culture = determineCulture(request);
//   const url =`http://api.name-fake.com/${culture}/${gender}`;

//   superagent(url).then(result => {
//     let randomName = result.name;
//     let person = {
//       name: randomName,
//       sex: gender
//     };
//     return person;
//   }).catch(error => {
//     errorHandler(error, request, response);
//   });
// }