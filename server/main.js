// 모듈 선언
require('dotenv').config();
const express = require('express');
// const swaggerUi = require('swagger-ui-express');

const app = express();

// 옵션 설정
app.use(express.urlencoded({ extended: true })); // 다중객체 표현 허용
app.use(express.json()); // 기존의 body-parser 역할
// app.use(upload.array()); // FormData 전용

// swagger 설정
// const specs = require('./swagger/swagger.js');
// console.log(specs);
// app.use("/api-docs", swaggerUi.serve);

// mongodb 연결
require('./mongo.js')();

// 서버 설정값
const PORT = process.env.SERVER_PORT || 3001;

// 0. 테스트 요소
const { s3Upload, s3GetObject } = require('./storage/s3');
app.get('/', async (req, res) => {
    console.log("app get test");
    // await s3Upload('testing continue.txt');
    // await s3GetObject('testing continue.txt');
    return res.send("success to get /");
});

// 1. 로그인 및 회원가입
const sign_in_router = require('./routers/signInRouter');
app.use('/sign-in', sign_in_router);

// 2. 게시글 리스트
const board_router = require('./routers/boardRouter');
app.use('/board', board_router);

// 서버 실행
const server = app.listen(PORT, () => console.log(`server is listening on port:${PORT}.`));