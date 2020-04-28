'use strict';
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

function errorHandler(error, request, response) {
  response.status(500).send('Something went wrong: ' + error);
}

function determineGender(request) {
  let gender = '';
  let genderBias = request.query.gender;
  let genderRoll =Math.random();
  if (genderRoll < genderBias) {
    gender = 'male';
  } else {
    gender = 'female';
  }
  return gender;
}

function determineCulture(request) {
  let culture = '';
  if (request.query.culture === 'german') {
    culture = 'german_germany';
  } else if (request.query.culture === 'greek') {
    culture = 'greek-greece';
  } else if (request.query.culture === 'japanese') {
    culture = 'japanese-japan';
  } else {
    culture = 'slovak-slovakia';
  }
  return culture;
}

function nameGenerator(request, response) {
  let gender = determineGender(request);
  const culture = determineCulture(request);
  const url =`http://api.name-fake.com/${culture}/${gender}`;

  superagent(url).then(result => {
    let randomName = result.name;
    let person = {
      name: randomName,
      sex: gender
    };
    return person;
  }).catch(error => {
    errorHandler(error, request, response);
  });
}

exports.createHierarchy = function(request, response) {
  // [2,2,2]
// // idea 1
// ['king','duke','duke','baron','baron','baron','baron','count','count','count','count','count','count','count','count']
// // idea 2
// ['king','duke','baron','count','count','baron','count','count','duke','baron','count','count','baron','count','count']
  let nameArray = [];
  let tier1Number = request.query.tier1;
  let tier2Number = request.query.tier2;
  let tier3Number = request.query.tier3;
  let declaredGovernment = request.query.government;
  let totalNumberOfPeople = tier1Number * tier2Number * tier3Number + 1;


  let selectQuery = `SELECT * FROM politics WHERE government=$1;`;
  let selectValues = [declaredGovernment];

  let data = dbClient.query(selectQuery, selectValues)
    .then(data => {
      console.log(data);
      return data;
    });

  for (let i = 0; i < totalNumberOfPeople; i++) {
    let newPerson = nameGenerator(request);
    nameArray.push(newPerson);
  }
  nameArray.forEach( (person, index) => {
    let title = '';
    if (index === 0 && person.sex === 'male') {
      title = data.ruler_male_title;
    } else if (index === 0 && person.sex === 'female') {
      title = data.ruler_female_title;
    } else if (index > 0 && index <= tier1Number && person.sex === 'male') {
      title = data.tier1_male_title;
    } else if (index > 0 && index <= tier1Number && person.sex === 'female') {
      title = data.tier1_female_title;
    } else if (index > tier1Number && index <= (tier1Number * tier2Number) && person.sex === 'male') {
      title = data.tier2_male_title;
    } else if (index > tier1Number && index <= (tier1Number * tier2Number)&& person.sex === 'female') {
      title = data.tier2_female_title;
    } else if (index > (tier1Number * tier2Number) && person.sex === 'male') {
      title = data.tier3_male_title;
    } else if (index > (tier1Number * tier2Number) && person.sex === 'female') {
      title = data.tier3_female_title;
    }

    let personName = person.name;
    let titleAndNameGender = title + ' ' + personName + ' (' + person.sex + ')';
    return titleAndNameGender;
  });
  console.log(nameArray);
}