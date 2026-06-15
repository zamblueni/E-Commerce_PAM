const express = require("express");
const router = express.Router();
const {
  listarUsuarios,
  buscarUsuario,
  atualizarUsuario,
  deletarUsuario,
} = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

router.get("/", authMiddleware, adminMiddleware, listarUsuarios);
router.get("/:id", authMiddleware, adminMiddleware, buscarUsuario);
router.put("/:id", authMiddleware, adminMiddleware, atualizarUsuario);
router.delete("/:id", authMiddleware, adminMiddleware, deletarUsuario);

module.exports = router;