const express = require('express');
const router = express.Router();
const Publicacion = require('../controllers/Publicacion');
const Publicacion = require('../models/Publicacion');


router.post('/publicaciones', Publicacion.createPublicacion);

router.get('/publicaciones', Publicacion.getAllPublicaciones);

router.get('/mascotas/:mascotaId/publicaciones', Publicacion.getPublicacionesByMascota);

router.put('/publicaciones/:id', Publicacion.updatePublicacion);

router.delete('/publicaciones/:id', Publicacion.deletePublicacion);

module.exports = router;
