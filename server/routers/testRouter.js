const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    console.log('test api get');
    res.send('test continue');
})

module.exports = router;