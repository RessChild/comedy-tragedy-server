const express = require('express');
const router = express.Router();

// 암호화 모듈
const { encrypt } = require('../crypto/aes');

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

  try {
    const posts = await getPosts(category);
    return res.send(posts);
  } catch (e) {
    console.log('/board/get-list error');
    return res.status(501).json({ error: "database error" });
  }
});

// 단일 게시글 출력
router.get('/get-post/:pid', async (req, res) => {
  const { post_id } = req.params;

  try {
    const post = await getPost(post_id);

    console.log("post id:", post_id, post);

    if( !post ) return res.status(501).end(); // 게시글 없음
    return res.json(post);
  } catch (e) {
    console.log('/board/get-post error');
    return res.status(501).json({ error: "database error" });
  }
});

// 게시글 작성
router.post('/upload-post', async (req, res) => {
  console.log("upload-post");
  const aes_phone_number = req.userInfo;
  const { title, category, content } = req.body;

  try {
    const user_id = await userSchema.findOne({ 'phone_number': aes_phone_number }).select('id');
    if( !user_id ) return res.status(501).end();

    console.log(user_id);

    const new_post = new postSchema({
      title,
      content,
      category,
      user_id,
    });
    const result = await new_post.save();
    console.log("post result:", result);
    return res.status(200).json({ result: 'success' });
  } catch (e) {
    console.log('/board/upload-post error');
    return res.status(501).json({ error: "database error" });
  }
});

// 덧글 작성
router.post('/upload-comment/:pid', (req, res) => {
  const { pid } = req.params;
  console.log(pid);
  res.json({ result: 'success' });
});

module.exports = router;