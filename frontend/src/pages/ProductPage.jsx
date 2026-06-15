import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useCart } from "../context/CartContext";

const ProductPage = () => {
  const { id } = useParams();
  const [produto, setProduto] = useState(null);
  const { adicionarAoCarrinho } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const buscarProduto = async () => {
      const { data } = await api.get(`/products/${id}`);
      setProduto(data);
    };
    buscarProduto();
  }, [id]);

  const handleComprar = () => {
    adicionarAoCarrinho(produto);
    navigate("/cart");
  };

  if (!produto) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="product-page">
      <img src={produto.imagem} alt={produto.nome} />
      <div>
        <h2>{produto.nome}</h2>
        <p>Marca: {produto.marca}</p>
        <p>Categoria: {produto.categoria}</p>
        <p>{produto.descricao}</p>
        <p>R$ {produto.preco.toFixed(2)}</p>
        <p>Estoque: {produto.estoque}</p>
        {produto.estoque > 0 ? (
          <>
            <button onClick={() => adicionarAoCarrinho(produto)}>
              Adicionar ao Carrinho
            </button>
            <button onClick={handleComprar}>Comprar Agora</button>
          </>
        ) : (
          <p>Produto fora de estoque</p>
        )}
      </div>
    </div>
  );
};

export default ProductPage;