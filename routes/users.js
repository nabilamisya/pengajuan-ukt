var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/home', function(req, res, next) {
  res.send('ini home');
});

module.exports = router;
