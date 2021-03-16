const express = require('express');
const router = express.Router();

// 샘플 데이터
const { boardViewData, boardListData } = require('../data/sample.js');


// 게시글 관련은 모두 jwt 확인이 필요
const { verifyJwt } = require('../jwt/jwt.js');
router.use('/*', verifyJwt);

// 게시글 목록 출력
router.get('/get-list/:category', (req, res) => {
  const { category } = req.params;
  console.log(category);
  res.send(boardListData);
});

// 단일 게시글 출력
router.get('/get-post/:pid', (req, res) => {
  const { pid } = req.params;
  console.log(pid);
  res.send(boardViewData.find( data => data.id === Number.parseInt(pid)));
});

// 게시글 작성
router.post('/upload-post', (req, res) => {
  const { title, data, category, content } = req;
  console.log("upload-post");
  res.json({ result: 'success' });
});

// 덧글 작성
router.post('/upload-comment/:pid', (req, res) => {
  const { pid } = req.params;
  console.log(pid);
  res.json({ result: 'success' });
});

module.exports = router;