// 테스트 명령어
// node ./server/storage/s3.js

// AWS S3 처리 스크립트
const aws = require('aws-sdk');
require('dotenv').config();

const ACCESS_KEY = process.env.S3_ACCESS_KEY;
const SECRET_KEY = process.env.S3_SECRET_KEY;
const BUCKET_NAME = process.env.S3_BUCKET_NAME;

console.log(ACCESS_KEY, SECRET_KEY);

const s3 = new aws.S3({ 
    region: "ap-northeast-2", 
    accessKeyId: ACCESS_KEY, 
    secretAccessKey: SECRET_KEY 
});

// param 생성
const generateParams = (path, filename, body) => ({
    "Bucket": BUCKET_NAME,
    "Key": `${path}/${filename}`,
    "Body": body,
})

// 파일 업로드
const s3Upload = async (filename) => {
    // s3.upload(params, {}, (err, data) => {
    //     if(err) console.log("fail upload :", err);
    //     else console.log("success upload :", data);
    // });

    const params = generateParams('image', filename, 'testing');

    try {
        // 저장 위치 (Bucket), 파일명 (Key), 파일 정보 (Body)
        const result = await s3.upload(params).promise();
        console.log("success upload :", result.Location);
    } catch (e) {
        console.log("fail upload :", e);
    }
}

// 특정 객체 참조
const s3GetObject = async (filename) => {
    // s3.getObject(params, (err, data) => {
    //     if(err) console.log("fail getObject :", err);
    //     else console.log("success getObject :", data.Body);
    // });

    const params = generateParams('image', filename)

    try {
        // 저장 위치 (Bucket), 파일명 (Key)
        const data = await s3.getObject(params).promise();
        console.log("success getObject :", data.Body);
    } catch (e) {
        console.log("fail getObject :", e);
    }
}

// 버킷 리스트 출력
// s3.listBuckets((err, data) => {
//     if(err) console.log("fail listBuckets :", err);
//     else console.log("success listBuckets :", data);
// })

module.exports = {
    s3Upload, s3GetObject,
}