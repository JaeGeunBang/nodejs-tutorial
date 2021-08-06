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
    secret: 'keyboard cat', // secret은 다른사람에게 노출되면 안되는 값으로, 소스코드에 포함시켜도 안되고 파일로 별도 저장할것.
    resave: false, // 데이터를 세션 저장소에 저장할지를 설정함. true면 세션 데이터의 변경 여부와 상관 없이 무조건 세션 저장소에 저장함
    saveUninitialized: true // 세션의 구동여부를 설정함. true는 세션이 필요하기 전까지 세션을 구동하지 않고, false는 무조건 구동한다. false는 서버의 부담이 올수있음
}));

app.get('/', function(req, res, next) {
    console.log(req.session) ;
    if(req.session.num === undefined) {
        req.session.num = 1;
    } else {
        req.session.num = req.session.num + 1;
    }
    res.send(`Views : ${req.session.num}`) ;
})

app.listen(3000, function() {
    console.log('Example app listening on port 3000!')
});
