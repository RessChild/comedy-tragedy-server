const mongoose = require('mongoose');
const { Schema, model } = mongoose;

// 댓글
const commentSchema = new Schema({
    comment: String, 
    // created_at: { type: Date, default: Date.now }, // 생성시점
    // updated_at: { type: Date, default: Date.now }, // 수정시점 
    user_id: { type: Schema.Types.ObjectId, ref: "User" },
    is_deleted: { type: Boolean, default: false },
    deleted_at: { type: Date, default: null },
    depth: { type: Number, default: 0 },
    // parent_id: { type: Schema.Types.ObjectId, ref: "" },
    // 이게 댓글의 부모? 아니면 대댓글에서의 부모?
}, { timestamps: true });

module.exports = model('Comment', commentSchema);