const User = require("../models/User");

const listarUsuarios = async (req, res) => {
  const usuarios = await User.find({}).select("-senha");
  res.json(usuarios);
};

const buscarUsuario = async (req, res) => {
  const usuario = await User.findById(req.params.id).select("-senha");

  if (usuario) {
    res.json(usuario);
  } else {
    res.status(404).json({ mensagem: "Usuário não encontrado" });
  }
};

const atualizarUsuario = async (req, res) => {
  const usuario = await User.findById(req.params.id);

  if (usuario) {
    usuario.nome = req.body.nome || usuario.nome;
    usuario.email = req.body.email || usuario.email;
    usuario.administrador = req.body.administrador ?? usuario.administrador;

    if (req.body.senha) {
      usuario.senha = req.body.senha;
    }

    const usuarioAtualizado = await usuario.save();

    res.json({
      _id: usuarioAtualizado._id,
      nome: usuarioAtualizado.nome,
      email: usuarioAtualizado.email,
      administrador: usuarioAtualizado.administrador,
    });
  } else {
    res.status(404).json({ mensagem: "Usuário não encontrado" });
  }
};

const deletarUsuario = async (req, res) => {
  const usuario = await User.findById(req.params.id);

  if (usuario) {
    await usuario.deleteOne();
    res.json({ mensagem: "Usuário removido" });
  } else {
    res.status(404).json({ mensagem: "Usuário não encontrado" });
  }
};

module.exports = { listarUsuarios, buscarUsuario, atualizarUsuario, deletarUsuario };