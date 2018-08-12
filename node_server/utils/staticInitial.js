const User = require('../models/User');
const IndividualUser = require('../models/IndividualUser');
const RealEstateUser = require('../models/RealEstateUser');

User.create({
    name: 'بهنام همایون',
}).then(behnam => {
    IndividualUser.create({
        username: 'behnam',
        password: '123',
        phone: '0919191919',
        balance: 0,
        userId: behnam.id
    }).then(function(){
        console.log('user behnam created.');
    });
});

User.create({
    name: 'ACM',
}).then(acm => {
    RealEstateUser.create({
        url: 'http://139.59.151.5:6664/khaneBeDoosh/v2/house',
        expTime: Date.now(),
        userId: acm.id
    });
});
