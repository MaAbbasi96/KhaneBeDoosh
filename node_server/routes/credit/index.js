const express = require('express');
const router = express.Router();
const increaseCredit = require('./increaseCredit');

router.use('/increase', increaseCredit);

module.exports = router;
