const express = require('express');
const router = express.Router();
const house = require('./house');
const moreInfo = require('./moreInfo');
const phone = require('./phone');

router.use('/', house);
router.use('/:id/:serverNum/', function(req, res, next){
    req.houseId = req.params.id;
    req.serverNum = req.params.serverNum;
    return next();
})
router.use('/:id/:serverNum/', moreInfo);
router.use('/:id/:serverNum/phone', phone);

module.exports = router;
