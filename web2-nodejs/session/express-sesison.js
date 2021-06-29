
var express = require('express');
var parseurl = require ('parseurl')
var session = require('express-session')
var fileStore = require('session-file-store')(session) // 세션 저장소에 세션 저장

var app = express();

app.use(session({
    secure: true,
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: new fileStore()
}))

app.use(function(req, res, next) {
    if (!req.session.views) {
        req.session.views = {};
    }

    var pathname = parseurl(req).pathname;

    req.session.views[pathname] = (req.session.views[pathname] || 0) + 1;
    next();
})

app.get('/', function(req, res, next) {
    console.log(req.session) // session 출력
    if(req.session.num === undefined) {
        req.session.num = 1 // session.num 변수에 값 추가. 해당 session 값은 서버가 종료되면 초기화 된다 (메모리에 저장하고 있으므로). 디스크 저장을 하고싶다면 session-file-store를 사용할것
    } else {
        req.session.num = req.session.num + 1
    }
    res.send(`views : ${req.session.num}`)
})

app.listen(3000, function() {
    console.log('3000!');
})