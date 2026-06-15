const express = require("express");
const router = express.Router();
const {
  criarPedido,
  listarMeusPedidos,
  listarTodosPedidos,
  atualizarStatusPedido,
} = require("../controllers/orderController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

router.post("/", authMiddleware, criarPedido);
router.get("/meus", authMiddleware, listarMeusPedidos);
router.get("/", authMiddleware, adminMiddleware, listarTodosPedidos);
router.put("/:id", authMiddleware, adminMiddleware, atualizarStatusPedido);

module.exports = router;