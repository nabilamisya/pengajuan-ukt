const jwt = require('jsonwebtoken');

function checktokenandrole(role) {
  
  return function(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
      return res.redirect("/auth/login");
    }

    jwt.verify(token, 'uii', function(err, decoded) {
      if (err) {
        return res.redirect('/auth/login'); // Redirect the user to the login page
      }

      req.userId = decoded.id;
      req.userRole = decoded.role; 
      req.userEmail = decoded.email;

      if (role && req.userRole !== role) {
        return res.redirect('/not-found');
      }
      next();
    });
  };
}

module.exports = checktokenandrole;