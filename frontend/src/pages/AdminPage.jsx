import { useState, useEffect } from "react";
import api from "../services/api";

const AdminPage = () => {
  const [produtos, setProdutos] = useState([]);
  const [nome, setNome] = useState("");
  const [imagem, setImagem] = useState("");
  const [marca, setMarca] = useState("");
  const [categoria, setCategoria] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [estoque, setEstoque] = useState("");

  const token = JSON.parse(localStorage.getItem("usuario")).token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const buscarProdutos = async () => {
    const { data } = await api.get("/products");
    setProdutos(data);
  };

  useEffect(() => {
    buscarProdutos();
  }, []);

  const criarProduto = async (e) => {
    e.preventDefault();
    await api.post(
      "/products",
      { nome, imagem, marca, categoria, descricao, preco: Number(preco), estoque: Number(estoque) },
      config
    );
    setNome("");
    setImagem("");
    setMarca("");
    setCategoria("");
    setDescricao("");
    setPreco("");
    setEstoque("");
    buscarProdutos();
  };

  const deletarProduto = async (id) => {
    if (window.confirm("Tem certeza?")) {
      await api.delete(`/products/${id}`, config);
      buscarProdutos();
    }
  };

  return (
    <div className="admin-page">
      <h2>Painel Administrativo</h2>

      <div>
        <h3>Adicionar Produto</h3>
        <form onSubmit={criarProduto}>
          <input
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="URL da Imagem"
            value={imagem}
            onChange={(e) => setImagem(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Marca"
            value={marca}
            onChange={(e) => setMarca(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Descrição"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Preço"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Estoque"
            value={estoque}
            onChange={(e) => setEstoque(e.target.value)}
            required
          />
          <button type="submit">Criar Produto</button>
        </form>
      </div>

      <div>
        <h3>Produtos Cadastrados</h3>
        {produtos.map((produto) => (
          <div key={produto._id}>
            <p>
              {produto.nome} - R$ {produto.preco.toFixed(2)} - Estoque: {produto.estoque}
            </p>
            <button onClick={() => deletarProduto(produto._id)}>Deletar</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;