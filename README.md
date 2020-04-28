# Political Hierarchy Generator

## A 301 Project for Code Fellows

## Version 1.0.0
## Created By: Peng Chen, Matthew Stewart, Joe Lee, Robert Carter, Peyton Cysewski

## Change Log
Version 1.0.0 - 4/27/2020 2:31pm - Set up file directory and began writing code


### Description
This is a project to create make a website for creative writers, world builders and roleplayers to fill in the names of fictional social hierarchys like fealty chains of feudal kingdoms, allowing them to allso customize the result of female and male percentages to fit their fantasy setting.

## Wire Frames  

### Views Flowchart
![chart](/asset/img/Hierarchy_Generator.png)

### Home Page
![home_page](/asset/img/home.png)

### Result Page (Org-Chart)
![result_page](/asset/img/results.png)

## API's
- [API for Saving Files to local machine](https://www.w3.org/TR/FileAPI/)
- [API for Gendered and Liguistically Consistent Name Generation](https://en.namefake.com/api)

## User Stories

#### Story 1

##### Generate a fictional heirarchical government.
###### As a user, I want to be able to create a fictional governenment hierarchy of my specifications.
###### Feature Tasks:
- Take inputs for file name, culture, government type, org levels, gender percentage, and short-form descriptions.
- Use inputs with an API to procedurally generate a government hierarchy.
###### Acceptance Tests:
- Make sure the API behavior is consistent with inputs.
- All hierarchy objects need to be of the same standard format.
- The function that generates the hierarchies needs to be determinate.

#### Story 2

##### Represent the hierarchy with an intuitive organizational chart.
###### As a user, I want to be have an easy-to-interact-with organizational chart representative of my newly generated (or stored) hierarchy.
###### Feature Tasks:
- Create a front end view for displaying the newly-generated hierarchy that is both intutitive and easy to digest.
- (Stretch) Allow for an intermediate stage where the **logged-in** user can view it and make edits.
###### Acceptance Tests:
- It works with multiple variations of heirarchical inputs.
- (Stretch) The **logged-in** user can make edits that are reflected in the database and re-rendered properly.

#### Story 3

##### Allowing users to log in to save and view hierarchies.
###### As a user, if I choose to log in to my unique account, I want to be able to save my fictional hierarchies and then view all of the past hiearchies I have previously saved.
###### Feature Tasks:
- Use a login page to allow users to either create an account or log in to an existing one.
- Use a database table of users to uniquely identify them.
- (Stretch) Use SHA-256 to hash the passwords for security purposes.
- (Stretch) Have live feedback of whether a username has been taken.
- (Stretch) Allow for a user to go to a 'settings' page where they can change their username, password, or both.
###### Acceptance Tests:
- A database table will have all of the unique users and their hashed passwords to check for logins.
- (Stretch) The database properly stores the hashed passwords.
- (Stretch) The 'change password' and 'change password' functionality is properly reflected in the database, and therfore also the login pages.

#### Story 4

##### Efficiently save heirarchies to a database for future access.
###### As an user, I need to be sure that all my heirarchies are properly saved to the database.
###### Feature Tasks:
- When a hierarchy is created and the user is **logged-in**, it is saved to a database upon creation.
- The hierarchy information is saved in an effecient manner, using data that can be passed into an algorithm that quickly recreates the hierarchy (which is then displayed via an org-chart view).
- (Stretch) The list of hiearchies can be sorted by id number (functioning as date), or by the name of their save, in ascending or descending order.
###### Acceptance Tests:
- Users will have their hierarchies stored uniquely and the database tables will be normalised.
- Users can access past hierarchies.
- (Stretch) The list of hierarchies, when sorted by id number or by save name, in ascending or descending order, retains the proper ordering when rendered in the paginated view.

#### Story 5

##### Download the hierarchy off of the website to a local client.
###### As a user, I want the ability to download my hierarchy to my local machine within a format that allows for easy reading via desktop word-processing programs and is printing friendly. Cross platform performance is also important, when options for file types saved to are chosen.
###### Feature Tasks:
- When viewing either a newly-generated hierarchy or an older one pulled from the database, a button will allow the user to download the contents of the hierarchy into a text file that is properly organized.
###### Acceptance Tests:
- It works and the format in the text file makes sense (i.e. includes Table of Contents, List of names and roles, etc. that is generated using the hierarchy data).