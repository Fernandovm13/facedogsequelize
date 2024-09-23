const { DataTypes } = require('sequelize');
const sequelize = require('../dataBase/DataBase');
const Mascota = require('./Mascota');

const Amistad = sequelize.define('Amistad', {
  mascotaId1: {
    type: DataTypes.INTEGER,
    references: {
      model: Mascota,
      key: 'id',
    },
    allowNull: false,
  },
  mascotaId2: {
    type: DataTypes.INTEGER,
    references: {
      model: Mascota,
      key: 'id',
    },
    allowNull: false,
  },
  
});

Mascota.belongsToMany(Mascota, { through: Amistad, as: 'amigos', foreignKey: 'mascotaId1' });
Mascota.belongsToMany(Mascota, { through: Amistad, as: 'amigos_con', foreignKey: 'mascotaId2' });

module.exports = Amistad;
