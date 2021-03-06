const mongoose = require('mongoose');
const { Schema, model } = mongoose;

// 게시글
const postSchema = new Schema({
    title: String,
    content: String,
    category: String,
    // created_at: { type: Date, default: Date.now }, // 생성시점
    // updated_at: { type: Date, default: Date.now }, // 수정시점 
    user_id: { type: Schema.Types.ObjectId, ref: "User" },
    is_deleted: { type: Boolean, default: false },
    deleted_at: { type: Date, default: null },
}, { timestamps: true });

module.exports = model('Post', postSchema);