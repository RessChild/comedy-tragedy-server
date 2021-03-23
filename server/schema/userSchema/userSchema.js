const mongoose = require('mongoose');
const { Schema, model } = mongoose;

// 사용자
const userSchema = new Schema({
    // salt: String, // 암호화 키
    phone_number: String, // 전화번호 (아이디)
    // created_at: { type: Date, default: Date.now }, // 생성시점
    // updated_at: { type: Date, default: Date.now }, // 수정시점 
    is_deleted: { type: Boolean, default: false },
    deleted_at: { type: Date, default: null },
    push_token: { type: String, default: '' },
}, { timestamps: true });

module.exports = model('User', userSchema);