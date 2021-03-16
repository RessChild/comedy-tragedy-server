const express = require('express');
const router = express.Router();

// 로그인 및 회원가입
router.route('/')
    .get((req, res) => {
        res.send('testing sign-in')
    })
    .post((req, res) => {
        const { phoneNumber } = res.body;
        console.log("sign-in", phoneNumber);
        res.status(200).send();
    })

module.exports = router;