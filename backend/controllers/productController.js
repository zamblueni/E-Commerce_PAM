const Product = require("../models/Product");

const listarProdutos = async (req, res) => {
  const produtos = await Product.find({});
  res.json(produtos);
};

const buscarProduto = async (req, res) => {
  const produto = await Product.findById(req.params.id);

  if (produto) {
    res.json(produto);
  } else {
    res.status(404).json({ mensagem: "Produto não encontrado" });
  }
};

const criarProduto = async (req, res) => {
  const { nome, imagem, marca, categoria, descricao, preco, estoque } = req.body;

  const produto = await Product.create({
    nome,
    imagem,
    marca,
    categoria,
    descricao,
    preco,
    estoque,
  });

  if (produto) {
    res.status(201).json(produto);
  } else {
    res.status(400).json({ mensagem: "Dados inválidos" });
  }
};

const atualizarProduto = async (req, res) => {
  const produto = await Product.findById(req.params.id);

  if (produto) {
    produto.nome = req.body.nome || produto.nome;
    produto.imagem = req.body.imagem || produto.imagem;
    produto.marca = req.body.marca || produto.marca;
    produto.categoria = req.body.categoria || produto.categoria;
    produto.descricao = req.body.descricao || produto.descricao;
    produto.preco = req.body.preco || produto.preco;
    produto.estoque = req.body.estoque ?? produto.estoque;

    const produtoAtualizado = await produto.save();
    res.json(produtoAtualizado);
  } else {
    res.status(404).json({ mensagem: "Produto não encontrado" });
  }
};

const deletarProduto = async (req, res) => {
  const produto = await Product.findById(req.params.id);

  if (produto) {
    await produto.deleteOne();
    res.json({ mensagem: "Produto removido" });
  } else {
    res.status(404).json({ mensagem: "Produto não encontrado" });
  }
};

module.exports = { listarProdutos, buscarProduto, criarProduto, atualizarProduto, deletarProduto };