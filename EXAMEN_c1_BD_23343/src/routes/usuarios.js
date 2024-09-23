const express = require('express');
const router = express.Router();
const Usuario = require('../controllers/Usuario');


router.post('/usuarios', Usuario.createUser);

router.get('/usuarios', Usuario.getAllUsers);

router.get('/usuarios/:id', Usuario.getUserById);

router.put('/usuarios/:id', Usuario.updateUser);

router.delete('/usuarios/:id', Usuario.deleteUser);

module.exports = router;
