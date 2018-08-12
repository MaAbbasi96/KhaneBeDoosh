const express = require('express');
const router = express.Router();
const request = require('request');
const House = require('../../models/House');
const RealEstateUser = require('./../../models/RealEstateUser');
const IndividualUser = require('./../../models/IndividualUser');
const PayFor = require('../../models/PayFor');

async function paymentMessage(userId, houseId){
  let message;
  await PayFor.find({
    where:{
      individualUserId: userId,
      houseId: houseId
    }
  }).then(async pay => {
    if(pay !== null)
      message = "paid";
    else{
      await IndividualUser.find({
        where:{
          id: userId
        }
      }).then(user =>{
        if(user.balance >= 1000){
          message = "paid";
          user.balance = user.balance - 1000;
          user.save();
          PayFor.create({
            individualUserId: userId,
            houseId: houseId
          });
        }
        else
          message = "creditError";
      });
    }
  });
  return message;
}

router.get('/', function(req, res, next) {
  let houseId = req.houseId;
  let serverNum = req.serverNum;
  let resJson = {};
  RealEstateUser.find({
    where:{
      id: serverNum
    }
  }).then(user => {
    request.get(user.url + '/' + houseId, async function (error, response, body){
      phone = JSON.parse(body).data.phone;
      resJson.message = await paymentMessage(1, houseId);
      if(resJson.message === 'paid')
        resJson.phone = phone;
      res.status(200).json(resJson);
    });
  });
});

module.exports = router;