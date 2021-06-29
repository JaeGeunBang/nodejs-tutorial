var express = require('express');
var router = express.Router() ;
var topic = require('../lib/topic');
var url = require('url');

router.get('/', function(req, res) {
    var _url = req.url ;
    var queryData = url.parse(_url, true).query;
    if(queryData.id === undefined) {
        topic.home(req, res)
    } else {
        topic.page(req, res)
    }
})

module.exports = router;