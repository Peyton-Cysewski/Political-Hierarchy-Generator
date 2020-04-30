'use strict';
$('#loginButton').click(()=>{
  $('#loginForm').show();
  $('#signUpForm').hide();
});

$('#signUpButton').click(()=>{
  $('#loginForm').hide();
  $('#signUpForm').show();
});


