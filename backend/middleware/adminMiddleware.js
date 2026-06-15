const adminMiddleware = (req, res, next) => {
  if (req.user && req.user.administrador) {
    next();
  } else {
    res.status(403).json({ mensagem: "Acesso negado, apenas administradores" });
  }
};

module.exports = adminMiddleware;