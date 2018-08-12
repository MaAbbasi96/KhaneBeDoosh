const express = require('express');
const router = express.Router();
const house = require('./house');
const credit = require('./credit');
const user = require('./user');

router.use('/house', house);
router.use('/credit', credit);
router.use('/user', user);

module.exports = router;
