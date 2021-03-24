const express = require('express');
const router = express.Router();

// jwt
const { generateJwt } = require('../jwt/jwt.js');

// 암호화
const { encrypt, decrypt } = require('../crypto/aes');

// sms 서비스 연결
const { requestSMS } = require('../sms/sens');

// mongodb
const userSchema = require('../schema/userSchema/userSchema');
const getUser = (phone_number) => userSchema.findOne({'phone_number': phone_number });

// 로그인 및 회원가입
router.post('/', async (req, res) => {
    const { phone_number } = req.body;
    const aes_phone_number = encrypt(phone_number);
    const user = await getUser(aes_phone_number);
    // console.log(result, Date.now());

    if (!user) { // 사용자 정보가 없는 경우
        // 새로 만들고 인증페이지로 이동시켜야함
        // 절차 관련해선 논의가 필요할듯
        console.log("no user data");
        return res.status(200).json({ token: null });
    }

    // 정보가 있으면 token 을 만들고 반환
    const token = generateJwt({ phone_number: phone_number, date: Date.now() });
    return res.status(200).json({ token: token });
});

// 인증 문자 전송
router.post('/auth-sms', async (req, res) => {
    console.log("auth-sms");
    // requestSMS();
})

// 새 계정 생성
router.post('/new-account', async (req, res) => {
    // AES 로 암호화
    const { phone_number } = req.body;
    const aes_phone_number = encrypt(phone_number);

    const user = await getUser(aes_phone_number);
    // 이미 해당 사용자가 존재하는 경우
    if( user ) return res.status(501).json({ "success": false }); 

    // 신규 정보 생성하여 db에 저장
    const new_user = new userSchema({
        phone_number: aes_phone_number,
    });
    const result = await new_user.save(); // 신규 유저 생성
    console.log('new-account', result);
    res.status(200).json({ "success": true });
});

module.exports = router;