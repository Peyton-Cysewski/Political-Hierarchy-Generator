exports.renderLoggedInHomePage = function (req, res) {
  // console.log(req.params);
  // console.log(req.params.id);
  // console.log(req.params.name);
  let name = req.params.name.slice(1);
  res.render('home', { loggedIn: true, user_id: req.params.id, user_name: name });
};
