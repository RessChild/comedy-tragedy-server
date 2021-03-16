# Comedy-Tragedy-Server
- NodeJs / Express 기반으로 작성
- "npm start" 혹은 "nodemon ./server/main.js" 로 실행

# NPM 설치목록
- express
- express-jwt
- body-parser
- jsonwebtoken
- dotenv
- nodemon

# 고민할것
- 서버에서 router 를 선언해서 쓰는데, 현재는 함수형태 모듈을 반환하여 사용하는 중.
    ==> 파라미터로 뭔가를 받는 경우가 존재하는가? 
        없으면 그냥 그 자체를 반환시키는게 젤 좋을 것 같은데.
- 일단은 로그인 시, 입력받은 전화번호로 token을 구성 중.
  다만, jwt는 불변성은 유지할 수 있지만, 보안적 측면은 그렇개 안좋아서 숨겨야하는 부분은 안쓰는게 좋은데
  그럼 어떤 정보로 jwt를 만들어야 할까?

# 참고자료
- https://www.npmjs.com/package/express-jwt
- https://im-developer.tistory.com/167