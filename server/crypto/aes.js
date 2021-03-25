const crypto = require('crypto');

const KEY_LENGTH = 32;
const IV_LENGTH = 16; // For AES, this is always 16

// 환경변수
const CRYPTO_SECRET_KEY = (process.env.CRYPTO_SECRET_KEY).slice(0, KEY_LENGTH);
const iv = (process.env.CRYPTO_IV_BYTES).slice(0, IV_LENGTH);

// 문자열 암호화
const encrypt = (text) => {
    // 암호화 객체
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(CRYPTO_SECRET_KEY), iv);
    let encrypted = cipher.update(text);

    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return encrypted.toString('hex');
}

// 암호 해독
const decrypt = (text) => {
    // 해독 객체
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(CRYPTO_SECRET_KEY), iv);
    let decrypted = decipher.update(text);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}

module.exports = { encrypt, decrypt };