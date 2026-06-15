const User = require("../models/User");
const jwt = require("jsonwebtoken");

const gerarToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const registrarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;

  const usuarioExiste = await User.findOne({ email });

  if (usuarioExiste) {
    return res.status(400).json({ mensagem: "Usuário já existe" });
  }

  const usuario = await User.create({
    nome,
    email,
    senha,
  });

  if (usuario) {
    res.status(201).json({
      _id: usuario._id,
      nome: usuario.nome,
      email: usuario.email,
      administrador: usuario.administrador,
      token: gerarToken(usuario._id),
    });
  } else {
    res.status(400).json({ mensagem: "Dados inválidos" });
  }
};

const loginUsuario = async (req, res) => {
  const { email, senha } = req.body;

  const usuario = await User.findOne({ email });

  if (usuario && usuario.senha === senha) {
    res.json({
      _id: usuario._id,
      nome: usuario.nome,
      email: usuario.email,
      administrador: usuario.administrador,
      token: gerarToken(usuario._id),
    });
  } else {
    res.status(401).json({ mensagem: "Email ou senha inválidos" });
  }
};

module.exports = { registrarUsuario, loginUsuario };