const express = require('express');
const router = express.Router();

// router.use(express.json());

const { generateJwt } = require('../jwt/jwt.js');
const userSchema = require('../schema/userSchema/userSchema');

// 로그인 및 회원가입
router.route('/')
    .get((req, res) => {
        res.send('testing sign-in')
    })
    .post(async (req, res) => {
        const { phone_number } = req.body;
        const result = await userSchema.findOne({ // 사용자 정보 탐색
            'phone_number': phone_number,
        });
        // console.log(result, Date.now());

        if (!result) { // 사용자 정보가 없는 경우
            // 새로 만들고 인증페이지로 이동시켜야함
            // 절차 관련해선 논의가 필요할듯
            console.log("정보 없어용");
        }


        const token = generateJwt({ phone_number: phone_number, date: Date.now() });
        res.status(200).json({ token: token });
    });

module.exports = router;