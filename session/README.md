
# Session
쿠키로 로그인 아이디, 비밀번호 등을 저장한다면 내용이 유출되어 보안 문제가 발생할수 있어 실무에서는 잘 사용하지 않는다.

이는 세션을 통해 보안을 강화할수 있다. 아래 그림은 실제 쿠키에 저장된 값이다.

![img.png](img/img.png)
- 세션 값으로는 어떤 정보도 알수없으며, 단지 사용자를 식별하는 값으로서 기능한다.
- 즉, `세션은 사용자의 민감한 정보는 서버쪽에 은밀하게 저장되어 보호`하고, 사용자의 웹 브라우저에는 `이 정보가 사용자의 것인지 아닌지를 식별`하는 데이터만 저장한다.
- 그래서 현대적인 애플리케이션은 인증을 쿠키로 하지 않는다. 쿠키는 사용자를 식별하는데만 사용하고, 실세 데이터는 서버쪽에 안전하게 파일이나 데이터베이스로 저장된다.

## express-session 사용
`npm install express-session`

## 세션 사용

아래와 같이 세션을 설정해준다.
```js
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
```

- 서버에 접속하면 `req.session.views[]` 이름으로 세션을 저장한다.
  - 초기엔 0값이 들어감
- 이후 /foo, /bar에 접속시 `req.session.views[/foo, /bar]`에 세션 값이 누적되어서 보여진다.
- 실제 request header를 보면 쿠키에 `connect.sid`라는 쿠키가 전송되는것을 볼수 있다.

![img2png](img/img2.png)
