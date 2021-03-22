const mongoose = require('mongoose');
const { Schema, model } = mongoose;

// 테이블 명
const sampleSchema = new Schema({
    sample: String,
}, { timestamps: true });

module.exports = model('sample', sampleSchema);