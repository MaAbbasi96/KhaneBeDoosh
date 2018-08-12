const Sequelize = require('sequelize');
const sequelize = require('../utils/database');
const User = require('./User');

const RealEstateUser = sequelize.define('realEstateUser', {
    url: Sequelize.STRING,
    expTime: Sequelize.BIGINT
});

RealEstateUser.belongsTo(User, {foreignKey: 'userId', onDelete: 'CASCADE'});

module.exports = RealEstateUser;