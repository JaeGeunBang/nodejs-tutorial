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


