var express = require('express');
var router = express.Router();
var root = require('app-root-path')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(root + '/views/contact.html');
});

module.exports = router;
