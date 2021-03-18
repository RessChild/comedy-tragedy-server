const express = require('express');
const router = express.Router();

// router.use(express.json());

const { generateJwt } = require('../jwt/jwt.js');

// 로그인 및 회원가입
router.route('/')
    .get((req, res) => {
        res.send('testing sign-in')
    })
    .post((req, res) => {
        const user_info = req.body;
        console.log(user_info);
        const token = generateJwt(user_info);
        res.status(200).json({ token: token });
    });

module.exports = router;