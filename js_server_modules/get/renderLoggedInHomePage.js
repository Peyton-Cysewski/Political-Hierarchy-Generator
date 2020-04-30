exports.renderLoggedInHomePage = function (req, res) {
  console.log(req.params.user);
  // console.log(req.params.id);
  // console.log(req.params.name);
  let data = req.params.user.split('+');
  res.render('home', { loggedIn: true, user_id: data[0], user_name: data[1] });
};
