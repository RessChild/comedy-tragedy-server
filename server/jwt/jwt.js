require('dotenv').config();
const jwt = require('jsonwebtoken');

// 비밀 키 정보
const SECRET_KEY = process.env.JWT_SECRET || 'secret_key';

// jwt 인증 코드
const verifyJwt = (req, res, next) => {
    const request_token = req.body.token;
    try {
        jwt.verify(request_token, SECRET_KEY);
        next();
    } catch {
        console.log('jwt error');
        next();
        // res.status(501).end();
    }
}

const generateJwt = (user_info) => {
    console.log("generate jwt");
    return 'abc';
}

module.exports = { 
    verifyJwt, generateJwt,
}