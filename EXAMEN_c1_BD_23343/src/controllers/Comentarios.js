const { Comentario, Mascota, Publicacion } = require('../models');


exports.createComentario = async (req, res) => {
  try {
    const { contenido, mascotaId, publicacionId } = req.body;

    
    const mascota = await Mascota.findByPk(mascotaId);
    const publicacion = await Publicacion.findByPk(publicacionId);

    if (!mascota || !publicacion) {
      return res.status(404).json({ message: 'Mascota o Publicación no encontradas' });
    }

    const nuevoComentario = await Comentario.create({ contenido, mascotaId, publicacionId });
    res.status(201).json(nuevoComentario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getComentariosByPublicacion = async (req, res) => {
  try {
    const { publicacionId } = req.params;

    const comentarios = await Comentario.findAll({
      where: { publicacionId },
      include: [{ model: Mascota }]
    });

    if (comentarios.length === 0) {
      return res.status(404).json({ message: 'No se encontraron comentarios para esta publicación' });
    }

    res.status(200).json(comentarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateComentario = async (req, res) => {
  try {
    const { id } = req.params;
    const { contenido } = req.body;

    const comentario = await Comentario.findByPk(id);
    if (!comentario) {
      return res.status(404).json({ message: 'Comentario no encontrado' });
    }

    comentario.contenido = contenido;
    await comentario.save();
    res.status(200).json(comentario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteComentario = async (req, res) => {
  try {
    const { id } = req.params;

    const comentario = await Comentario.findByPk(id);
    if (!comentario) {
      return res.status(404).json({ message: 'Comentario no encontrado' });
    }

    await comentario.destroy();
    res.status(200).json({ message: 'Comentario eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
