const { DataTypes } = require('sequelize');
const sequelize = require('../dataBase/DataBase');
const User = require('./User');

const Mascota = sequelize.define('Mascota', {
  nombre_mascota: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tipo_mascota: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  edad_mascota: {
    type: DataTypes.INTEGER,
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    references: {
      model: User, // Relación con Usuario
      key: 'id_usuario',
    },
  }
});

User.hasMany(Mascota, { foreignKey: 'id_usuario' });
Mascota.belongsTo(User, { foreignKey: 'id_usuario' });

module.exports = Mascota;
