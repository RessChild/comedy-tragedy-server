const mongoose = require('mongoose');

// 사용자
const userSchema = new mongoose.Schema({
    // salt: String, // 암호화 키
    phone_number: String, // 전화번호 (아이디)
    // created_at: { type: Date, default: Date.now }, // 생성시점
    // updated_at: { type: Date, default: Date.now }, // 수정시점 
    is_deleted: { type: Boolean, default: false },
    deleted_at: { type: Date, default: null },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);