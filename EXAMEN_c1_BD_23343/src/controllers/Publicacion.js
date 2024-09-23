const { Publicacion, Mascota } = require('../models');


exports.createPublicacion = async (req, res) => {
  try {
    const { titulo, contenido, mascotaId } = req.body;

    const mascota = await Mascota.findByPk(mascotaId);

    if (!mascota) {
      return res.status(404).json({ message: 'Mascota no encontrada' });
    }

    const nuevaPublicacion = await Publicacion.create({ titulo, contenido, mascotaId });
    res.status(201).json(nuevaPublicacion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllPublicaciones = async (req, res) => {
  try {
    const publicaciones = await Publicacion.findAll({
      include: [{ model: Mascota }]
    });
    res.status(200).json(publicaciones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPublicacionesByMascota = async (req, res) => {
  try {
    const { mascotaId } = req.params;

    const publicaciones = await Publicacion.findAll({
      where: { mascotaId },
      include: [{ model: Mascota }]
    });

    if (publicaciones.length === 0) {
      return res.status(404).json({ message: 'No se encontraron publicaciones para esta mascota' });
    }

    res.status(200).json(publicaciones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updatePublicacion = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, contenido } = req.body;

    const publicacion = await Publicacion.findByPk(id);
    if (!publicacion) {
      return res.status(404).json({ message: 'Publicación no encontrada' });
    }

    publicacion.titulo = titulo;
    publicacion.contenido = contenido;
    await publicacion.save();
    res.status(200).json(publicacion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deletePublicacion = async (req, res) => {
  try {
    const { id } = req.params;

    const publicacion = await Publicacion.findByPk(id);
    if (!publicacion) {
      return res.status(404).json({ message: 'Publicación no encontrada' });
    }

    await publicacion.destroy();
    res.status(200).json({ message: 'Publicación eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
