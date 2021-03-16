// 모듈 선언
require('dotenv').config();
const express = require('express');

const app = express();

// 기존의 body-parser 역할
app.use(express.json());

// 서버 설정값
const PORT = process.env.SERVER_PORT || 3001;

// 1. 로그인 및 회원가입
const sign_in_router = require('./routers/signInRouter');
app.use('/sign-in', sign_in_router);

// 2. 게시글 리스트
const board_router = require('./routers/boardRouter');
app.use('/board', board_router);

// 서버 실행
const server = app.listen(PORT, () => console.log(`server is listening on port:${PORT}.`));