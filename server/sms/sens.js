// 네이버 Simple Easy Notification Service
const axios = require('axios');
const { createHmac } = require('crypto')

// 환경변수
const SERVICE_ID = process.env.SENS_SERVICE_ID;
const SECRET_KEY = process.env.SENS_SECRET_KEY;
const ACCESS_KEY = process.env.SENS_ACCESS_KEY;
const PHONE_NUMBER = process.env.SENS_PHONE_NUMBER;

// 암호화 시그니처
const DATE = Date.now().toString();
const HMAC_URL = `/sms/v2/services/${SERVICE_ID}/messages`;

const hmac = createHmac('sha256', SECRET_KEY); // sha256 기반으로 암호화
hmac.update(`POST ${HMAC_URL}\n${DATE}\n${ACCESS_KEY}`); // 내용 갱신
const signature = hmac.digest('base64') // base64 기반으로 인코딩 변경

// POST
const REQUEST_URL = `https://sens.apigw.ntruss.com/sms/v2/services/${SERVICE_ID}/messages`;
const REQUEST_HEADER = {
    "Content-Type": "application/json; charset=utf-8",
    "x-ncp-apigw-timestamp": DATE,
    "x-ncp-iam-access-key": ACCESS_KEY,
    "x-ncp-apigw-signature-v2": signature,
}
const REQUEST_BODY = {
    "type": "SMS",
    "from": PHONE_NUMBER,
    "content": "테스트 문자 보내기!!", // 기본 내용 (default)
    "messages":[
        {
            "to":"01074469585", // 보낼 대상 (전화번호)
            "content": "개별 내용임 ㅇㅇ" // 개별 메시지 내용
        }
    ],
};
// DELETE
const CANCEL_URL = `https://sens.apigw.ntruss.com/sms/v2/services/{serviceId}/reservations/{reserveId}`

// sms 요청
const requestSMS = async () => {
    try {
        const { data } = await axios.post(REQUEST_URL, REQUEST_BODY, { headers: REQUEST_HEADER })
            // .then( ({ data }) => console.log("success::", data))
            // .catch( e => console.log(e));
        console.log(data);
    }
    catch (e) {
        console.log(`fail to send sns from ${PHONE_NUMBER}`);
    }
}

module.exports = {
    requestSMS,
}