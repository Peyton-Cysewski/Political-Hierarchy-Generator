exports.renderLoginPage = function (req, res) {
  res.render('login', { loggedIn: false, user_id: null, user_name: null });
};
