const express = require('express');
const router = express.Router();
const request = require('request');
const Sequelize = require('sequelize');
const sequelize = require('../../utils/database');
const individualUser = require('../../models/IndividualUser');

router.get('/', function(req, res, next) {
    individualUser.find({
        where:{
            username: 'behnam'
        }
    }).then(behnam =>{
        return res.json({'name': behnam.username, 'credit': behnam.balance});
    })
});

module.exports = router;