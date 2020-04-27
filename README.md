# Political Hierarchy Generator

## A 301 Project for Code Fellows


### Description
This is a project to create make a website for creative writers, world builders and roleplayers to fill in the names of fictional social hierarchys like fealty chains of feudal kingdoms, allowing them to allso customize the result of female and male percentages to fit their fantasy setting.


Wire Frames  
Home page
![home_page](/asset/img/homePage.png)

Result page
![result_page](/asset/img/result.png)


[API for Saving Files to local machine](https://www.w3.org/TR/FileAPI/)

[API for Gendered and Liguistically Consistent Name Generation](https://en.namefake.com/api)

### User Stories

#### Story 1

Generating a fictional heirarchical government
As a user, I want to be able to create a fictional governenment heirarchy of my specifications.
Feature Tasks
- Take inputs for culture, government type, org levels, gender percentage, and shortform descriptions
- Use inputs with an API to procedurally generate a government heirarchy
Acceptance Tests
- Make sure the API behavior is consistent with inputs
- All heirarchy objects need to be of the same standard format

#### Story 2

Represent the heirarchy with an intuitive organizational chart
As a user, I want to be have an easy-to-interact-with organizational chart representative of my newly generated heirarchy.
Feature Tasks
- Create a front end view for displaying the newly-generated heirarchy that is both intutitive and easy to digest
- (Stretch) Allow for an intermediate stage where the user can view it and make edits before saving (if logged in)
Acceptance Tests
- It works with multiple variations of heirarchical inputs

#### Story 3

Efficiently save heirarchies to a database for future access
As an admin, I need to be able to ensure that all heirarchies are saved to the database 
Feature Tasks
- When a heirarchy is created and a user is logged in, it is saved to a database
- (Stretch) The heirarchy information is saved in a highly effecient manner, possibly using a primitive form of compression or have data that can be passed into an algorithm that quickly recreates it
Acceptance Tests
- Users will have their heirarchies stored uniquely and the database tables will be normalised

#### Story 4

Unique account logins with access to past saved heirarchies
As a user, if I choose to log in to my unique account, I want to be able to view all of the governments I have created.
Feature Tasks
- Use a login page to allow users to both create accounts or log in to an existing account
- Use a database table of users to uniquely identify them
- (Stretch) Use SHA-256 to hash the passwords for security purposes
- (Stretch) Have live feedback of whether a username has been taken
Acceptance Tests
- A database table will have all of the unique users and their hashed passwords to check for logins

#### Story 5

Download the heirarchy off of the website
As a user, I want the ability to download my heirarchy to my local machine. Ideally within a format that allow easy reading via desktop word processing programs and printing friendly. Cross platform performance is also important, when options for file types saved to are chosen.
Feature Tasks
- When viewing either a newly-generated heirarchy or an older one pulled from the database, a button will allow the user to download the contents of the heirarchy into a .txt file that is properly organized.
Acceptance Tests
- It works and the format in the text file makes sense (Table of Contents included?)

