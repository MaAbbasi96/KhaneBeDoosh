const Sequelize = require('sequelize');
const sequelize = require('../utils/database');
const User = require('./User');

const IndividualUser = sequelize.define('individualUser', {
    username: Sequelize.STRING,
    password: Sequelize.STRING,
    phone: Sequelize.STRING,
    balance: Sequelize.INTEGER
});

IndividualUser.belongsTo(User, {foreignKey: 'userId', onDelete: 'CASCADE'});

module.exports = IndividualUser;