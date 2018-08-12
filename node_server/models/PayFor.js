const Sequelize = require('sequelize');
const sequelize = require('../utils/database');
const IndividualUser = require('./IndividualUser');
const House = require('./House');

const PayFor = sequelize.define('payFor');

House.belongsToMany( IndividualUser, {
    // as: [house],
    through: PayFor, //this can be string or a model,
    foreignKey: 'houseId'
});

IndividualUser.belongsToMany(House, {
    // as: [individualUser],
    through: PayFor,
    foreignKey: 'individualUserId'
});

module.exports = PayFor;