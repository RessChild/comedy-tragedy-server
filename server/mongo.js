const mongoose = require('mongoose');

const uri = process.env.MONGO_URI;

// 연결 대기
// mongoose.Promise = global.Promise;

// 연결
module.exports = () => {
    mongoose.connect(uri)
        .then(() => console.log('Successfully connected to mongodb'))
        .catch(e => console.error(e));
}