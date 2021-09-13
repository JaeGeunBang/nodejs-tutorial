var express = require('express');
var router = express.Router();
var root = require('app-root-path')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.sendFile(root + '/views/about.html');
});

module.exports = router;
