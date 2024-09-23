const { Mascota, Amistad } = require('../models');


exports.createAmistad = async (req, res) => {
  try {
    const { mascotaId1, mascotaId2 } = req.body;

    const mascota1 = await Mascota.findByPk(mascotaId1);
    const mascota2 = await Mascota.findByPk(mascotaId2);

    if (!mascota1 || !mascota2) {
      return res.status(404).json({ message: 'Una o ambas mascotas no existen' });
    }

    const nuevaAmistad = await Amistad.create({ mascotaId1, mascotaId2 });
    res.status(201).json(nuevaAmistad);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAmistadesByMascotaId = async (req, res) => {
  try {
    const { id } = req.params;

    const mascota = await Mascota.findByPk(id, {
      include: [
        { model: Mascota, as: 'amigos' },  // Mascotas a las que esta mascota ha agregado como amigo
        { model: Mascota, as: 'amigos_con' },  // Mascotas que han agregado a esta mascota como amigo
      ]
    });

    if (!mascota) {
      return res.status(404).json({ message: 'Mascota no encontrada' });
    }

    res.status(200).json(mascota);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteAmistad = async (req, res) => {
  try {
    const { mascotaId1, mascotaId2 } = req.body;

  
    const amistad = await Amistad.findOne({
      where: { mascotaId1, mascotaId2 }
    });

    if (!amistad) {
      return res.status(404).json({ message: 'Amistad no encontrada' });
    }

    await amistad.destroy();
    res.status(200).json({ message: 'Amistad eliminada con éxito' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
