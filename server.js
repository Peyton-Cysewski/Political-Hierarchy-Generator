'use strict';


// DEPENDENCIES
require('dotenv').config();
const express = require('express');
const app = express();
// const superagent = require('superagent');
const methodOverride = require('method-override');
// const pg = require('pg');
const cors = require('cors');
const PORT = process.env.PORT;


const FileSaver = require('file-saver');
// var blob = new Blob(["Hello, world!"], {type: "text/plain;charset=utf-8"});
// FileSaver.saveAs(blob, "hello world.txt");
// FileSaver saveAs(Blob/File/Url, optional DOMString filename, optional Object { autoBom: true });


// DEPENDENCY INTEGRATION
app.set('view engine', 'ejs');
app.use(cors());
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
// const dbClient = new pg.Client(process.env.DATABASE_URL);


// DATABASE CONNECTION
// dbClient.connect(error => {

//   if (error) {
//     console.log('Something went wrong with the Database: ' + error);
//   } else {
//     console.log('Connected to database');
//   }
// });


// JS MODULES
const renderHomePage = require('./js_server_modules/get/renderHomePage.js');
const createHierarchy = require('./js_server_modules/post/createHierarchy.js');
const renderNewAccount = require('./js_server_modules/get/renderNewAccount.js');
const renderLoginPage = require('./js_server_modules/get/renderLoginPage.js');
const saveUser = require('./js_server_modules/post/saveUser.js');
const renderLoggedInHomePage = require('./js_server_modules/get/renderLoggedInHomePage.js');
const login = require('./js_server_modules/get/login.js');
const saveHierarchy = require('./js_server_modules/post/saveHierarchy.js');
// const renderSavedHierarchies = require('./js_server_modules/get/renderSavedHierarchies.js');



// ALL ROUTES + CALLBACKS
// **NOTE** - Callbacks need to be defined in module directories and imported directly above this section.
// ROUTE TYPE   -----------------------------------------------------   STATUS   -----------------   DESCRIPTION   --------------------------------------------------------------------------- //
// GET
app.get('/', renderHomePage.renderHomePage);                            // ROUTE WORKING, VIEW IN PROGRESS // - will display a different header view when user is logged out versus when logged in.
app.get('/home/:userdata', renderLoggedInHomePage.renderLoggedInHomePage)
app.get('/login', login.login);                                         // TODO // - logs the user in by checking to see if their username and password match, returning them to the page they were just at, either to the home page or the hierarchy they just created while logged out.
app.get('/loginPage', renderLoginPage.renderLoginPage);                 // ROUTE WORKING, VIEW IN PROGRESS // - displays the login page with form for username and password; a link to create account is also visible.
app.get('/createAccount', renderNewAccount.renderNewAccount);           // ROUTE WORKING, VIEW IN PROGRESS // - displays a similar form to the login page; (Stretch: as the user puts in their username, checks database and denies it if it has already been taken, case sensitive).
// app.get('/saved/:userdata', renderSavedHierarchies.renderSavedHierarchies);                           // TODO // - displays a list of all the save-names of the hierarchies that user has ever created; (Stretch: can sort by name or by hidden id).
// app.get('/paginatedSaved', renderPaginatedHierarchies);              // TODO // - displays a hierarchy in the same format that the 'renderHierarchy' function shows, but with paging buttons that paginate through the list from the previous view.
// stretch goals
// app.get('/accountSettings', renderAccountSettings);                  // TODO //
// app.get('/about', renderAboutPage);                                  // TODO //

// POST
app.post('/create', createHierarchy.createHierarchy);                   // ROUTE WORKING, VIEW IN PROGRESS // - generates hierarchy before rendering it.
app.post('/signup', saveUser.saveUser);                                 // TODO // - sends login data to be saved to database 'project' in table 'users'. 
app.post('/save', saveHierarchy.saveHierarchy);                         // TODO // - saves the proper hierarchy metadata to the database 'project' in tables 'politics' and 'hierarchy'.
//
// PUT
// stretch goals
// app.put('/updateUser', updateUser)                                   // TODO //

// DELETE
// stretch goals for admin only
// app.delete...


app.listen(PORT, ()=>{
  console.log(`server is running on ${PORT}`);
});
