const crypto = require('crypto');

const CRYPTO_SECRET_KEY = (process.env.CRYPTO_SECRET_KEY).slice(0, 32);
// const IV_LENGTH = 12 // For AES, this is always 16
const IV_LENGTH = 16 // For AES, this is always 16

// const iv = crypto.pseudoRandomBytes(IV_LENGTH);
// const iv = crypto.randomBytes(IV_LENGTH);
const iv = (process.env.CRYPTO_IV_BYTES).slice(0,16);

const encrypt = (text) => {
/*
    const cipher = crypto.createCipheriv('des-ecb', CRYPTO_SECRET_KEY, iv, { authTagLength: 16 });

    const encrypted = cipher.update(text, 'utf-8');
    cipher.final();
    console.log("암호화된 값:", encrypted.toString("hex"));
    return encrypted.toString("hex");
*/

    // let iv = crypto.randomBytes(IV_LENGTH);
    let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(CRYPTO_SECRET_KEY), iv);
    let encrypted = cipher.update(text);

    encrypted = Buffer.concat([encrypted, cipher.final()]);

    return iv.toString('hex') + ':' + encrypted.toString('hex');
}

const decrypt = (text) => {
    /*
    const decipher = crypto.createDecipheriv('des-ecb', CRYPTO_SECRET_KEY, iv, { authTagLength: 16 });
    // decipher.setAAD()
    decipher.update(text, null, "utf-8");

    const decrypted = decipher.final();
    decipher.final();

    console.log("해독한 값:", decrypted.toString("utf-8"));
    return decrypted.toString("utf-8");
    */


    let textParts = text.split(':');
    let iv = Buffer.from(textParts.shift(), 'hex');
    let encryptedText = Buffer.from(textParts.join(':'), 'hex');
    let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(CRYPTO_SECRET_KEY), iv);
    let decrypted = decipher.update(encryptedText);

    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString();
}

module.exports = { encrypt, decrypt };