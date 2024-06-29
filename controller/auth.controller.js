const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User} = require('../models')


const form = (req, res) => {
  res.render('login');
};


const prosesLogin = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    return res.status(401).json({ message: 'Invalid password' });
  }

  res.cookie('user', user, { httpOnly: true });
  console.log(user.role)

  if (user?.role?.trim() == 'Admin') {
    return res.redirect('/admin/dashboard');
  }

};

function logout(req, res) {
  res.clearCookie('user');
  res.redirect('/auth/login');
}








module.exports = {
  form,
  prosesLogin,
  logout,
};
