var express = require('express');
var app = express();
var session = require('express-session')
var parseurl = require('parseurl')
var fs = require('fs');
var sanitizeHtml = require('sanitize-html');
var bodyParser = require('body-parser');
var compression = require('compression');
var topicRouter = require('./routes/topic');
var indexRouter = require('./routes/index');
var helmet = require('helmet');

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());
app.use(express.static('public'));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

app.use(function(req, res, next) {
    if (!req.session.views) {
        req.session.views = {};
    }

    var pathname = parseurl(req).pathname ;
    req.session.views[pathname] = (req.session.views[pathname] || 0) + 1;

    next();
});

app.get('/foo', function(req, res, next) {
    res.send('you viewed this page ' + req.session.views['/foo'] + ' times')
})

app.get('/bar', function(req, res, next) {
    res.send('you viewed this page ' + req.session.views['/bar'] + ' times')
})

app.listen(3000, function() {
    console.log('Example app listening on port 3000!')
});
