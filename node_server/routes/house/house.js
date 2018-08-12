const Sequelize = require('sequelize');
const express = require('express');
const router = express.Router();
const request = require('request');
const RealEstateUser = require('./../../models/RealEstateUser');
const Op = Sequelize.Op;
const House = require('../../models/House');

function updateExpHouses(){
  RealEstateUser.findAll({
    where:{
      expTime:{
        [Op.lt]: Date.now()
      }
    }
  }).then(expUsers=>{
    expUsers.forEach(user => {
      House.destroy({
        where: {
          userId: user.id
        }
      }).then(function(){
        request(user.url, function (error, response, body) {
          if(response.statusCode === 200){
            let jsonBody = JSON.parse(body);
            user.expTime= jsonBody.expireTime; 
            user.save();
            var houses = jsonBody.data;
            houses.forEach(house => {
              House.create({
                area: house.area,
                id: house.id,
                buildingType: house.buildingType,
                address: house.address,
                imageURL: house.imageURL,
                dealType: house.dealType,
                basePrice: house.dealType == 0 ? 0: house.price.basePrice,
                rentPrice: house.dealType == 0 ? 0: house.price.rentPrice,
                sellPrice: house.dealType == 1 ? 0: house.price.sellPrice,
                phone: '',
                description: '',
                userId: user.id
              });
            });
          }
        });
      });
    });
  });
}

function getConstraints(query){
  let whereJson={};
  let buildingType = query.buildingType;
  let dealType = query.dealType;
  let areaLimit = query.areaLimit;
  let maxPrice = query.maxPrice;
  if(buildingType !== '')
    whereJson.buildingType = buildingType;
  if(areaLimit !== '')
    whereJson.area = {[Op.gte]: areaLimit};
  if(maxPrice !== '' && (dealType === 1 || dealType === ''))
    whereJson.rentPrice = {[Op.lte]: maxPrice};
  if(maxPrice !== '' && (dealType === 0 || dealType === ''))
    whereJson.sellPrice = {[Op.lte]: maxPrice};
  if(dealType !== '')
    whereJson.dealType = dealType;
  return whereJson;
}

router.get('/', function(req, res, next) {
  updateExpHouses();
  let whereJson = getConstraints(req.query);
  let resJson = {
    data: []
  };
  House.findAll({
    where:whereJson
  }).then(houses=>{
    houses.forEach(house => {
      let price;
      if(house.dealType == 1)
        price = {
          rentPrice: house.rentPrice,
          basePrice: house.basePrice
        };
      else
        price = {sellPrice: house.sellPrice};
      resJson.data.push({
        area: house.area,
        address: house.address,
        price: price,
        imageURL: house.imageURL,
        serverNum: house.userId,
        id: house.id,
        dealType: house.dealType,
        buildingType: house.buildingType
      });
    });
    res.status(200).json(resJson);
  })
  console.log(resJson);
  return res;
});

module.exports = router;
         