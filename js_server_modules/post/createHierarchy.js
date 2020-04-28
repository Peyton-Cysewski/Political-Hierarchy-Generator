// request.body.tier1
// request.body.tier2
// request.body.tier3
// request.body.government
// request.body.gender
// (request.body.culture

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



let testArray = ['king', 'duke', 'duke', 'baron', 'baron', 'baron', 'baron', 'count', 'count', 'count', 'count','count', 'count', 'count', 'count'];

let ownedbyRuler = testArray.map( (tier1Person, index) => ) 




exports.createHierarchy = function(request, response) {
  // [2,2,2]
// // idea 1
// ['king','duke','duke','baron','baron','baron','baron','count','count','count','count','count','count','count','count']
// // idea 2
// ['king','duke','baron','count','count','baron','count','count','duke','baron','count','count','baron','count','count']
 idea 3
  result array [
    [{name: king}], 
    [
      {king:duke1},
      {king:duke2},
      {king:duke3},
    ],  
    [
      [
        {duke1:baron1},
        {duke1:baron2},
        {duke1:baron3},
      ],
      [
        {duke2:baron1},
        {duke2:baron2},
        {duke2:baron3},
      ],
      [
        {duke3:baron1},
        {duke3:baron2},
        {duke3:baron3},
      ]
    ],
    [
      [
        {baron1:count1},
        {baron1:count2},
        {baron1:count3},
        {baron1:count4},
      ],
      [
        {baron2:count1},
        {baron2:count2},
        {baron2:count3},
        {baron2:count4},
      ],
      [
        {baron3:count1},
        {baron3:count2},
        {baron3:count3},
        {baron3:count4},
      ]
    ]
   




    // idea 4
    // person {
    //     title:
    //     name:
    //     gender:
    //     superior:
    //     }

[duke1,duke2,duk][]}]
  let nameArray = [];
  let tier1Number = request.body.tier1;
  let tier2Number = request.body.tier2;
  let tier3Number = request.body.tier3;
  let declaredGovernment = request.body.government;
  let totalNumberOfPeople = tier1Number * tier2Number * tier3Number + 1;


  let selectQuery = `SELECT * FROM politics WHERE government=$1;`;
  let selectValues = [declaredGovernment];

  let data = dbClient.query(selectQuery, selectValues)
    .then(data => {
      console.log(data);
      return data;
    });
  let tier1Array =[];
  for (let i = 0; i < totalNumberOfPeople; i++) {
    let newPerson = nameGenerator(request);
    nameArray.push(newPerson);
  }
  nameArray.map( (person, index) => {
    let title = '';
    let personName = '';
    let titleAndNameGender = '';

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
      title = data.tier2_female_title;      personName = person.name;
      titleAndNameGender = title + ' ' + personName + ' (' + person.sex + ')';
      tier2Array.push(titleAndNameGender);
    } else if (index > (tier1Number * tier2Number) && person.sex === 'male') {
      title = data.tier3_male_title;      personName = person.name;
      titleAndNameGender = title + ' ' + personName + ' (' + person.sex + ')';
      tier3Array.push(titleAndNameGender);
    } else if (index > (tier1Number * tier2Number) && person.sex === 'female') {
      title = data.tier3_female_title;
    }


  });
  console.log(nameArray);
};

<ul>
    <li>king person name (male)</li>
        <ul>
            <li>duke some guy (male)</li>
                <ul>
                    <li>baron payton cat(male)</li>
                        <ul>
                    <li>baron payton dragonslayer(male)</li>

                </ul>
            <li>duchess some gal (female)</li>
        </ul>