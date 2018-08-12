const express = require('express');
const router = express.Router();
const request = require('request');
const Sequelize = require('sequelize');
const sequelize = require('../../utils/database');
const individualUser = require('../../models/IndividualUser');
const bankURL = 'http://139.59.151.5:6664/bank/pay';

function increaseCredit(credit){
    individualUser.find({
        where:{
            username: 'behnam'
        }
    }).then(behnam =>{
        behnam.balance = behnam.balance + credit;
        behnam.save();
    })
    console.log(credit); //TODO: db works
}

router.post('/', function(req, res, next) {
    let credit = req.body.credit;
    if(credit <= 0 || credit != parseInt(credit)){
        res.status(403).json({'message': 'invalidInput'});
    }
    else{
        request.post(bankURL, function (error, response, body) {
            let jsonBody = JSON.parse(body);
            if(jsonBody.result === 'OK'){
                increaseCredit(parseInt(credit));
                res.status(200).json({'message': 'success'});
            }
            else
                res.status(500).json({'message': 'serverError'});
        });
    }
    return res;
});

module.exports = router;