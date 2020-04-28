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
// ROUTE TYPE -----------------------------------------   STATUS   ---------------   DESCRIPTION   --------------------------------------------------------- //
// GET
app.get('/', renderHomePage);                           // TODO // - will display different header view when user is logged out versus when logged in.
app.get('/hierarchy', renderHierarchy);                 // TODO // - will display different header view when user is logged out versus when logged in.
app.get('/login', renderLoginPage);                     // TODO // - displays the login page with form for username and password; a link to create account is also visible.
app.get('/createAccount', renderNewAccount);            // TODO // - displays a similar form to the login page; (Stretch: as the user puts in their username, checks database and denies it if it has already been taken, case sensitive).
app.get('/saved', renderSavedHierarchies);              // TODO // - displays a list of all the save-names of the hierarchies that user has ever created; (Stretch: can sort by name or by hidden id).
app.get('/paginatedSaved', renderPaginatedHierarchies); // TODO // - displays a hierarchy in the same format that the 'renderHierarchy' function shows, but with paging buttons that paginate through the list from the previous view.
// Stretch
// app.get('/accountSettings', renderAccountSettings);  // TODO //
// app.get('/about', renderAboutPage);                  // TODO //

// POST
app.post('/input', createHierarchy);                    // TODO // - generates hierarchy before rendering it.
app.post('/login', login);                              // TODO // - logs the user in by checking to see if their username and password match, returning them to the page they were just at, either to the home page or the hierarchy they just created while logged out.

// PUT
app.put('/createAccount', saveUser);                    // TODO // - sends login data to be saved to database 'project' in table 'users'. 
app.put('/save', saveHierarchy);                        // TODO // - saves the proper hierarchy metadata to the database 'project' in tables 'politics' and 'hierarchy'.
// Stretch
// app.put('/updateUser', updateUser)                   // TODO //




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