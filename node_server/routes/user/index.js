const express = require('express');
const router = express.Router();
const info = require('./info');

router.use('/info', info);

module.exports = router;
