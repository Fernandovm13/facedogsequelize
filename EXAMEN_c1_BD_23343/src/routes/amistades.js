const express = require('express');
const router = express.Router();
const Amistad = require('../controllers/Amistad');


router.post('/amistad', Amistad.createAmistad);

router.get('/mascotas/:id/amistades', Amistad.getAmistadesByMascotaId);

router.delete('/amistad', Amistad.deleteAmistad);

module.exports = router;
