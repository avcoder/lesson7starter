exports.register = (req, res) => {
  res.render('register', { title: 'Register' });
};

exports.login = (req, res) => {
  res.render('login', { title: 'Login' });
};
