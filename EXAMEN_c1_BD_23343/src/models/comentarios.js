const { DataTypes } = require('sequelize');
const sequelize = require('../dataBase/DataBase');
const Mascota = require('./Mascota');
const Publicacion = require('./Publicacion');

const Comentario = sequelize.define('Comentario', {
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
  },
  publicacionId: {
    type: DataTypes.INTEGER,
    references: {
      model: Publicacion,
      key: 'id'
    },
    allowNull: false
  }
});


Mascota.hasMany(Comentario, { foreignKey: 'mascotaId' });
Comentario.belongsTo(Mascota, { foreignKey: 'mascotaId' });

Publicacion.hasMany(Comentario, { foreignKey: 'publicacionId' });
Comentario.belongsTo(Publicacion, { foreignKey: 'publicacionId' });

module.exports = Comentario;
