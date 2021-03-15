const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    const { phoneNumber } = res.body;
    console.log("sign-in", phoneNumber);
    res.status(200).send();
})

module.exports = router;