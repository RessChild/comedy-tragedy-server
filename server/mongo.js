const mongoose = require('mongoose');

const URI = process.env.MONGO_URI;

// 연결 대기
// mongoose.Promise = global.Promise;

// 연결
module.exports = () => {
    mongoose.connect(URI, {
            // 구버전 문제를 해결하기 위한 옵션정보 2개
            useNewUrlParser: true, 
            useUnifiedTopology: true,
        })
        .then(() => console.log('Successfully connected to mongodb'))
        .catch(e => console.error(e));
}