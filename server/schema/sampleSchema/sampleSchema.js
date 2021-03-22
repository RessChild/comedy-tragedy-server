const mongoose = require('mongoose');

const sampleSchema = new mongoose.Schema({
    data: String,
});

module.exports = sampleSchema;