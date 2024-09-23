const { DataTypes } = require('sequelize');
const sequelize = require('../dataBase/DataBase');

const Usuario = sequelize.define('Usuario', {
  Nam_users: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

module.exports = User;

