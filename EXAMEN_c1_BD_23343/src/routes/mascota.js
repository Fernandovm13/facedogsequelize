const express = require('express');
const router = express.Router();
const Mascota = require('../controllers/Mascota');

router.post('/mascotas', Mascota.createMascota);

router.get('/mascotas', Mascota.getAllMascotas);

router.get('/mascotas/:id', Mascota.getMascotaById);

router.get('/usuarios/:usuarioId/mascotas', Mascota.getMascotasByUsuario);

router.put('/mascotas/:id', Mascota.updateMascota);

router.delete('/mascotas/:id', Mascota.deleteMascota);

module.exports = router;
