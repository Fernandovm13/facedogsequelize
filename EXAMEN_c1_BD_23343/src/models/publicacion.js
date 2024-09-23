const { DataTypes } = require('sequelize');
const sequelize = require('../dataBase/DataBase');
const Mascota = require('./Mascota');

const Publicacion = sequelize.define('Publicacion', {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  contenido: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  fecha: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  mascotaId: {
    type: DataTypes.INTEGER,
    references: {
      model: Mascota,
      key: 'id'
    },
    allowNull: false
  }
});


Mascota.hasMany(Publicacion, { foreignKey: 'mascotaId' });
Publicacion.belongsTo(Mascota, { foreignKey: 'mascotaId' });

module.exports = Publicacion;
