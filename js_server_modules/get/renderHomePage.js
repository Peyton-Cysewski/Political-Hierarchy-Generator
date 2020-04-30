exports.renderHomePage = function (req, res) {
  res.render('home', { loggedIn: false, user_id: null });
};
