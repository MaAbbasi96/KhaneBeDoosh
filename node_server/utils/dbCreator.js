const User = require('../models/User');
const IndividualUser = require('../models/IndividualUser');
const RealEstateUser = require('../models/RealEstateUser');
const House = require('../models/House');
const PayFor = require('../models/PayFor');

User.sync().then(function(){
    console.log('user table created')
}).error(function(error){
    console.log(err);
});

IndividualUser.sync().then(function(){
    console.log('individualUser table created')
}).error(function(error){
    console.log(err);
});

RealEstateUser.sync().then(function(){
    console.log('realEstateUser table created')
}).error(function(error){
    console.log(err);
});

House.sync().then(function(){
    console.log('house table created')
}).error(function(error){
    console.log(err);
});

PayFor.sync().then(function(){
    console.log('payFor table created')
}).error(function(error){
    console.log(err);
});
