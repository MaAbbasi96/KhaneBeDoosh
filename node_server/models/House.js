const Sequelize = require('sequelize');
const sequelize = require('../utils/database');
const RealEstateUser = require('./RealEstateUser');

const House = sequelize.define('house', {
    id:{
        type: Sequelize.STRING,
        primaryKey: true
    },
    area: Sequelize.INTEGER,
    buildingType: Sequelize.STRING,
    address: Sequelize.STRING,
    imageURL: Sequelize.STRING,
    dealType: Sequelize.INTEGER,
    basePrice: Sequelize.INTEGER,
    sellPrice: Sequelize.INTEGER,
    rentPrice: Sequelize.INTEGER,
    phone: Sequelize.STRING,
    description: Sequelize.STRING
});

House.belongsTo(RealEstateUser, {foreignKey: 'userId', onDelete: 'CASCADE'});

module.exports = House;