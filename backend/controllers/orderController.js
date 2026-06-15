const Order = require("../models/Order");
const Product = require("../models/Product");

const criarPedido = async (req, res) => {
  const { itens, total } = req.body;

  if (!itens || itens.length === 0) {
    return res.status(400).json({ mensagem: "Nenhum item no pedido" });
  }

  const pedido = await Order.create({
    usuario: req.user._id,
    itens,
    total,
  });

  // DIMINUIR ESTOQUE
  for (const item of itens) {
    await Product.findByIdAndUpdate(item.produto, {
      $inc: { estoque: -item.quantidade },
    });
  }

  if (pedido) {
    res.status(201).json(pedido);
  } else {
    res.status(400).json({ mensagem: "Dados inválidos" });
  }
};

const listarMeusPedidos = async (req, res) => {
  const pedidos = await Order.find({ usuario: req.user._id }).populate(
    "itens.produto",
    "nome imagem preco"
  );
  res.json(pedidos);
};

const listarTodosPedidos = async (req, res) => {
  const pedidos = await Order.find({})
    .populate("usuario", "nome email")
    .populate("itens.produto", "nome imagem preco");
  res.json(pedidos);
};

const atualizarStatusPedido = async (req, res) => {
  const pedido = await Order.findById(req.params.id);

  if (pedido) {
    pedido.status = req.body.status || pedido.status;
    const pedidoAtualizado = await pedido.save();
    res.json(pedidoAtualizado);
  } else {
    res.status(404).json({ mensagem: "Pedido não encontrado" });
  }
};

module.exports = { criarPedido, listarMeusPedidos, listarTodosPedidos, atualizarStatusPedido };