const mongoose = require('mongoose');
const { Schema, model } = mongoose;

// 접속 기록
const accessSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: "User" },
    time: { type: Date, default: Date.now },
    device: String,
}, /*{ timestamps: true }*/);

module.exports = model('Access', accessSchema);