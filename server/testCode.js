// 모듈 선언
const express = require('express');
const app = express();

// .env 설정할 것
const PORT = 3001;

// 라우팅 기본 설정
app.get('/', (req,res) => {
    res.send('hello clients');
})

const server = app.listen(PORT, () => console.log(`server is listening on port:${PORT}.`));