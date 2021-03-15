// 모듈 선언
require('dotenv').config();
const { config } = require('dotenv');
const express = require('express');
// const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');

const app = express();

// 기존의 body-parser 역할
app.use(express.json());
// app.use(expressJwt({ secret: process.env.JWT_SECRET }));

// 서버 설정값
const PORT = process.env.SERVER_PORT || 3001;

// 라우터 설정
const signInRouter = require('./routers/signInRouter');

app.use('/sign-in', signInRouter);

// 서버 실행
const server = app.listen(PORT, () => console.log(`server is listening on port:${PORT}.`));