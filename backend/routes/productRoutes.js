const express = require("express");
const router = express.Router();
const {
  listarProdutos,
  buscarProduto,
  criarProduto,
  atualizarProduto,
  deletarProduto,
} = require("../controllers/productController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

router.get("/", listarProdutos);
router.get("/:id", buscarProduto);
router.post("/", authMiddleware, adminMiddleware, criarProduto);
router.put("/:id", authMiddleware, adminMiddleware, atualizarProduto);
router.delete("/:id", authMiddleware, adminMiddleware, deletarProduto);

module.exports = router;