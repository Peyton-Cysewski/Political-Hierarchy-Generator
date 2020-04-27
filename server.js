'use strict';

require('dotenv').config();

const express = require('express');
const app = express();

const superagent = require('superagent');


const ejs = require('ejs');
app.set('view engine', 'ejs');

const methodOverride = require('method-override');

const pg = require('pg');

const dbClient = new pg.Client(process.env.DATABASE_URL);

dbClient.connect(error => {

  if (error) {
    console.log('Something went wrong with the Database: ' + error);
  } else {
    console.log('Connected to database');
  }
});

const PORT = process.env.PORT;



let gender = '';
let culture = '';

function determineGender() {

  let genderBias = request.query.gender;
  let genderRoll =Math.random();
  if (genderRoll < genderBias) {
    gender = 'male';
  } else {
    gender = 'female';
  }
}

function determineCulture() {
  if (request.query.culture === 'german') {
    culture = 'german_germany';
  } else if (request.query.culture === 'greek') {
    culture = 'greek-greece';
  } else if (request.query.culture === 'japanese') {
    culture = 'japanese-japan';
  } else {
    culture = 'slovak-slovakia';
  }
}


function generateName() {
  determineGender();
  determineCulture();
  let url =`http://api.name-fake.com/${culture}/${gender}`;

  superagent(url);

}
