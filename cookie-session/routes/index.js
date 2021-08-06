var express = require('express');
var router = express.Router();
var cookie = require('cookie');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.headers.cookie)
  var cookies = {}
  if(req.header.cookie !== undefined) {
    cookies = cookie.parse(req.headers.cookie) // Cookie 모듈을 통해 쿠키 처리, 객체화되기 때문에 다루기 더 쉽다
  }
  console.log(cookies)
  console.log(cookies.yummy_cookie)
  res.writeHead(200,{
    'Set-Cookie': [
        'yummy_cookie=choco', // 세션 쿠키
        'tasty_cookie=strawberry', // 세션 쿠키
        `Permanent=cookies; Max-Age=${60*60*24*30}`, // 영속 쿠키
        'Secure=Secure; Secure', // HTTPS 프로토콜로 통신할때만 쿠키 전송
        'HttpOnly=HttpOnly; HttpOnly' // Http 통신때만 쿠키 전송
    ]
  });
  res.end('Cookie!!')
});

module.exports = router;
