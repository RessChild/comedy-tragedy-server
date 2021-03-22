const mongoose = require('mongoose');

// 게시글
const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    category: String,
    // created_at: { type: Date, default: Date.now }, // 생성시점
    // updated_at: { type: Date, default: Date.now }, // 수정시점 
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    is_deleted: { type: Boolean, default: false },
    deleted_at: { type: Date, default: null },
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);