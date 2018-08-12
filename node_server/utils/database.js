const Sequelize = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'sqlite',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },// uikl;l/fsdf/utilsdatabase.sqlite
  storage: __dirname + 'database.sqlite'
});

module.exports = sequelize;