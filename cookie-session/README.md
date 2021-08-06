# Cookie-Session

## Cookie 추가
아래 코드를 통해 cookie를 추가할수 있다.
```js
res.writeHead(200,{
  'Set-Cookie': ['yummy_cookie=choco', 'tasty_cookie=strawberry']
});
```

이후 Network - Response Header에 Cookie 값이 생성되었음을 볼수있다.
- 서버가 클라이언트에게 답장으로 위 쿠키를 제공해준다.

위 코드를 주석처리 한다.
- 클라이언트의 쿠키에 해당 값을 저장하고 있으므로, 클라이언트가 서버에 접속할때 쿠키를 같이 전송한다.
- Network - Request Header를 보면 쿠키가 생성되었음을 알수있다.


## Cookie 종류
세션 쿠키, 영속 쿠키?
- `세션 쿠키`는 웹브라우저가 켜저 있는 동안에만 유효한 쿠키라 브라우저가 종료됐다가 다시 실행하거나 새로운 브라우저를 켜면 사라져 있음
- `영속 쿠키`는 세션 쿠키의 Max-Age or Expires 같은 옵션을 설정하면 된다.

## 쿠키 옵션 (Secure, HttpOnly)
```js
'Set-Cookie': [
    'yummy_cookie=choco', // 세션 쿠키
    'tasty_cookie=strawberry', // 세션 쿠키
    `Permanent=cookies; Max-Age=${60*60*24*30}`, // 영속 쿠키
    'Secure=Secure; Secure', // HTTPS 프로토콜로 통신할때만 쿠키 전송
    'HttpOnly=HttpOnly; HttpOnly' // Http 통신때만 쿠키 전송
]
```

