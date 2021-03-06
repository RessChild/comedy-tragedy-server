# Comedy-Tragedy-Server
- NodeJs / Express 기반으로 작성
- "npm run-script dev" 혹은 "nodemon ./server/main.js" 로 단일 실행
  "npm start" 혹은 "pm2 start ecosystem.config.js" 로 데몬 실행
- 접속 주소 : http://3.15.156.86/ (AWS 공용 ip)
- 2021/04/04 시점으로 해당 프로젝트는 무기한 보류
  ( 사용성에 대한 의문으로 프로젝트 보류 )

# NPM 설치목록
- express
- express-jwt
- body-parser
- jsonwebtoken
- dotenv
- nodemon
- swagger-ui-express 
- swagger-jsdoc
- mongoose
- axios
- pm2
- aws-sdk

# PM2 설명서
- pm2 start 실행하길_원하는_js파일(or 설정파일)
  ( ex. pm2 start ecosystem.config.js )
- 서버를 데몬화시켜서 죽지않도록 하는 미들웨어
- 별 다른 옵션 설정이 없다면 fork 로 코드를 실행
  최대한의 효율을 내기 위해선 클러스터 모드로 실행해야 함 (설정파일이 필요)
- 리스트 확인 : pm2 list
  재가동 : pm2 reload
  데몬 제거 : pm2 delete (프로세스 id)
  pm2 종료 : pm2 kill

# 고민할것
- 서버에서 router 를 선언해서 쓰는데, 현재는 함수형태 모듈을 반환하여 사용하는 중.
    ==> 파라미터로 뭔가를 받는 경우가 존재하는가? 
        없으면 그냥 그 자체를 반환시키는게 젤 좋을 것 같은데.
- 일단은 로그인 시, 입력받은 전화번호로 token을 구성 중.
  다만, jwt는 불변성은 유지할 수 있지만, 보안적 측면은 그렇개 안좋아서 숨겨야하는 부분은 안쓰는게 좋은데
  그럼 어떤 정보로 jwt를 만들어야 할까?
- 왜 formData는 인지를 못하는지.. 세팅을 해주긴했는데
    ==> 찾아보니 쓸려면 multer 사용이 불가피한듯. 반드시 필요.
        ( https://cinema4dr12.tistory.com/962 )
- swagger 는 적용방식을 찾는 중인데, 에러가 자꾸 뜸 ( require() of ES modules is not supported. )
  ==> swagger 는 import 방식으로 만들어졌는데, nosdejs 에선 require를 사용해서 생기는 문제
      6.0 버전으로 다운그레이드를 하면 해결된다는데, 좀더 찾아봐야할 것 같음.
      ( 좀더 정확하겐, CommonJs랑 ES6의 문법 차이 )
- 일반 상태에선 import를 못쓰고, type 을 module로 바꾸면 require를 못쓰고...
- salt로 전화번호를 암호화할려고 했는데, 이러면 탐색은 어떻게하지..
  탐색 flag 값 자체가 암호화가 되는거라 이건 못할거같음...
- token 생성엔 원본 폰번호를 사용? 아니면 암호화된 폰번호를 사용?
- AWS 에 파일 올렸고, mongo 연동까진 성공함
  근데, 이걸 클라이언트에서 어떻게 서버로 접속해야하는지 감이 안옴..

# 해야할 것
- phone_number 를 암호화 못하니 다른 보안측면을 어떻게 할 것인가 논의 필요 OK
- timestamps 로 생성,수정 시점은 자동 갱신되도록 할 수 있는데, 이걸 쓸건지 논의 필요 OK
- 토큰 기간제한 없애기 OK
- user 스키마에 push_token 정보 추가 OK
- 비밀키로 내부암호화 진행하도록 방향 수정 OK
- DB 관련해선 전부 try-catch 구문을 사용하도록 수정해야 함 OK
- 암호화된 번호롤 token을 짜게끔 개선 OK
- 핸드폰 번호를 받아서 문자를 전송하도록 구조 개선
- AWS E2 연동 (+ 인바운드 규칙에 포트 추가) OK

# 참고자료
- https://www.npmjs.com/package/express-jwt
- https://im-developer.tistory.com/167
- https://velog.io/@yongh8445/Node-Express-Swagger-%EC%97%B0%EB%8F%99
- https://dooopark.tistory.com/8
- https://gngsn.tistory.com/69
- https://www.daleseo.com/js-babel-node/
- https://velog.io/@ohzzi/Node.js-%EC%97%90%EC%84%9C-importexport-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0
- https://somjang.tistory.com/entry/WindowsMongodb%EC%84%A4%EC%B9%98%ED%95%98%EA%B8%B0ver-420
- https://yceffort.kr/2020/06/encryption-decryption-nodejs
- https://g0pher.tistory.com/185
- https://teamnova0410-dev.tistory.com/7
- https://engineering.linecorp.com/ko/blog/pm2-nodejs/
- https://isme2n.github.io/devlog/2017/06/21/pm2-usage/
- https://brunch.co.kr/@daniellim/43
- https://simsimjae.tistory.com/65
- https://hunjang.tistory.com/19