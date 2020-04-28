'use strict';

// DEPENDENCIES
require('dotenv').config();
const express = require('express');
const app = express();
const superagent = require('superagent');
const ejs = require('ejs');
const methodOverride = require('method-override');
const pg = require('pg');
const PORT = process.env.PORT;

// DEPENDENCY INTEGRATION
app.set('view engine', 'ejs');
const dbClient = new pg.Client(process.env.DATABASE_URL);

// DATABASE CONNECTION
dbClient.connect(error => {

  if (error) {
    console.log('Something went wrong with the Database: ' + error);
  } else {
    console.log('Connected to database');
  }
});

// JS MODULES
// imports go here...

// ALL ROUTES + CALLBACKS
// **NOTE** - Callbacks need to be defined in module directories and imported directly above this section.
// ROUTE TYPE -----------------------------------------   STATUS   ---------------   DESCRIPTION (if necessary)   ----------------------------------------------- //
// GET
app.get('/', renderHomePage);                           // TODO // - will display different view when user is logged out versus when logged in.
app.get('/hierarchy', renderHierarchy);                 // TODO // - will display different view when user is logged out versus when logged in.
app.get('/login', renderLoginPage);                     // TODO //
app.get('/createAccount', renderNewAccount);            // TODO //
app.get('/saved', renderSavedHierarchies);              // TODO //
app.get('/paginatedSaved', renderPaginatedHierarchies); // TODO //
// Stretch
// app.get('/accountSettings', renderAccountSettings);  // TODO //
// app.get('/about', renderAboutPage);                  // TODO //

// POST
app.post('/input', createHierarchy);                    // TODO // - generates hierarchy before rendering it.
app.post('/login', login);                              // TODO // - logs the user in, returning them to the page they were just at, either to the home page or the hierarchy they just created while logged out.

// PUT
app.put('/createAccount', saveUser);                    // TODO // - sends login data to be saved to database 'project' in table 'users'. 
app.put('/save', saveHierarchy);                        // TODO // - saves the proper hierarchy metadata to the database 'project' in tables 'politics' and 'hierarchy'.




function determineGender() {
  let gender = '';
  let genderBias = request.query.gender;
  let genderRoll =Math.random();
  if (genderRoll < genderBias) {
    gender = 'male';
  } else {
    gender = 'female';
  }
}

function determineCulture() {
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

function nameGenerator(request) {
let gender = determineGender(request);
const culture = determineCulture(request);
const url =`http://api.name-fake.com/${culture}/${gender}`;

superagent(url).then(result => {
  let randomName = result.name;
  let person = { 
    name: randomName,
    sex: gender
  };
 }).catch(error, request, response)

}

function hierarchyHandler(request, response) {
  
  for () {
    let newPerson = nameGenerator(request);
  }
}

app


// function Government() {
//   this.government = ;
//   this.rulerMaleTitle = ;
//   this.rulerFemaleTitle = ;
//   this.governmentDescription = ;
//   this.tier1 = ;
//   this.tier1MaleTitle = ;
//   this.tier1FemaleTitle = ;
//   this.tier1Description = ;
//   this.tier2 = ;
//   this.tier2MaleTitle = ; 
//   this.tier2FemaleTitle = ;
//   this.tier2Description = ; 
//   this.tier3 = ; 
//   this.tier3MaleTitle = ;
//   this.tier3FemaleTitle = ;
//   this.tier3Description = ;
// }