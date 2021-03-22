const express = require('express');
const router = express.Router();

// 샘플 데이터
const { boardViewData, boardListData } = require('../data/sample.js');
const userSchema = require('../schema/userSchema/userSchema');
const postSchema = require('../schema/postSchema/postSchema');

// DB 함수
const getPosts = (category) => postSchema.find({}).select('id title createdAt category');
const getPost = (post_id) => postSchema.findOne({ id: post_id });

// 게시글 관련은 모두 jwt 확인이 필요
const { verifyJwt } = require('../jwt/jwt.js');
router.use('/*', verifyJwt);

// 게시글 목록 출력
router.get('/get-list/:category', async (req, res) => {
  const { category } = req.params;
  console.log("category:", category);

  const posts = await getPosts(category);
  res.send(posts);
});

// 단일 게시글 출력
router.get('/get-post/:pid', async (req, res) => {
  const { post_id } = req.params;
  const post = await getPost(post_id);

  console.log("post id:", post_id, post);

  if( !post ) return res.status(501).end(); // 게시글 없음
  return res.json(post);
  // res.send(boardViewData.find( data => data.id === Number.parseInt(pid)));
});

// 게시글 작성
router.post('/upload-post', async (req, res) => {
  console.log("upload-post");
  const phone_number = req.userInfo;
  const { title, category, content } = req.body;

  console.log(phone_number);

  const user_id = await userSchema.findOne({ 'phone_number': phone_number }).select('id');
  if( !user_id ) return res.status(501).end();

  console.log(user_id);

  const new_post = new postSchema({
    title,
    content,
    category,
    user_id,
  });
  const result = await new_post.save();
  // console.log("post result:", result);
  res.status(200).json({ result: 'success' });
});

// 덧글 작성
router.post('/upload-comment/:pid', (req, res) => {
  const { pid } = req.params;
  console.log(pid);
  res.json({ result: 'success' });
});

module.exports = router;