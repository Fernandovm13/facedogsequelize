const express = require('express');
const router = express.Router();
const Comentarios = require('../controllers/Comentarios');


router.post('/Comentarios', Comentarios.createComentario);

router.get('/Publicaciones/:publicacionId/Comentarios', Comentarios.getComentariosByPublicacion);

router.put('/Comentarios/:id', Comentarios.updateComentario);

router.delete('/Comentarios/:id', Comentarios.deleteComentario);

module.exports = router;
