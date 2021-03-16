const express = require('express');
const router = express.Router();

// 샘플용 포스트 값
const boardListData = [
  {
    id: 1,
    title: '제목1',
    date: '',
    category: '',
  },
  {
      id: 2,
      title: '제목2',
      date: '',
      category: '',
  },
  {
      id: 3,
      title: '제목3',
      date: '',
      category: '',
  },
];

const boardViewData = [
  {
    id: 1,
    userId: 'test',
    title: '제목1',
    date: '',
    category: '',
    content: '',
    comment: [
      {id: 1, userId: 'test', content: '댓글내용1', subComment: [{}]},
      {id: 2, userId: 'test', content: '댓글내용2', subComment: [{}]},
    ],
  },
];

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