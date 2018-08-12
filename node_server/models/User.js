const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const User = sequelize.define('user', {
    name: Sequelize.STRING,
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    }
});

module.exports = User;