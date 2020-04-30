exports.renderNewAccount = function (req, res) {
  res.render('newUser', { loggedIn: false, user_id: null });
};