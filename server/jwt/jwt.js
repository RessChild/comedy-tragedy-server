require('dotenv').config();
const jwt = require('jsonwebtoken');

// 비밀 키 정보
const SECRET_KEY = process.env.JWT_SECRET || 'secret_key';

// jwt 인증 코드
const verifyJwt = (req, res, next) => {
    const request_token = req.body.token;
    // console.log(req.body);
    try {
        const payload = jwt.verify(request_token, SECRET_KEY);
        req.userInfo = payload.phone_number;
        next();
    } catch {
        console.log('jwt error');
        // next();
        res.status(501).end();
    }
}

// jwt 생성 코드
const generateJwt = (user_info) => {
    const token = jwt.sign(user_info, SECRET_KEY, { expiresIn: "60s" });
    console.log("generate jwt:", token);
    return token;
}

// jwt 디코드
const decodeJwt = (token) => {
    const user_info = jwt.decode(token, SECRET_KEY);
    console.log("decode jwt:", user_info);
    return user_info;
} 

module.exports = { 
    verifyJwt, generateJwt,
}