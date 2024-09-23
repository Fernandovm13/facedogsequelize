const mysql = require('mysql2');
const bcrypt = require('bcrypt');

require('dotenv').config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

const { Mascota, User } = require('../models');


exports.getAllMascotas = async (req, res) => {
  try {
    const mascotas = await Mascota.findAll({
      include: User 
    });
    res.status(200).json(mascotas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getMascotaById = async (req, res) => {
  try {
    const mascota = await Mascota.findByPk(req.params.id, {
      include: User 
    });
    if (mascota) {
      res.status(200).json(mascota);
    } else {
      res.status(404).json({ message: 'Mascota not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.createMascota = async (req, res) => {
  try {
    const { nombre_mascota, tipo_mascota, edad_mascota, id_usuario } = req.body;
    const newMascota = await Mascota.create({ nombre_mascota, tipo_mascota, edad_mascota, id_usuario });
    res.status(201).json(newMascota);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.updateMascota = async (req, res) => {
  try {
    const { nombre_mascota, tipo_mascota, edad_mascota, id_usuario } = req.body;
    const mascota = await Mascota.findByPk(req.params.id);

    if (mascota) {
      mascota.nombre_mascota = nombre_mascota;
      mascota.tipo_mascota = tipo_mascota;
      mascota.edad_mascota = edad_mascota;
      mascota.id_usuario = id_usuario;
      await mascota.save();
      res.status(200).json(mascota);
    } else {
      res.status(404).json({ message: 'Mascota not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteMascota = async (req, res) => {
  try {
    const mascota = await Mascota.findByPk(req.params.id);
    if (mascota) {
      await mascota.destroy();
      res.status(200).json({ message: 'Mascota deleted successfully' });
    } else {
      res.status(404).json({ message: 'Mascota not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
