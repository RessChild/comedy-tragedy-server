// 테스트 명령어
// node ./server/storage/s3.js

const aws = require('aws-sdk');
require('dotenv').config();

const ACCESS_KEY = process.env.S3_ACCESS_KEY;
const SECRET_KEY = process.env.S3_SECRET_KEY;

console.log(ACCESS_KEY, SECRET_KEY);

const s3 = new aws.S3({ region: "ap-northeast-2", accessKeyId: ACCESS_KEY, secretAccessKey: SECRET_KEY });
const params = {
    'Bucket': "comedy-tragedy-bucket",
    'Key': "KakaoTalk_20210317_130820803.jpg",
}

s3.getObject(params, (err, data) => {
    if(err) console.log("fail", err);
    else console.log("success", data.Body);
});