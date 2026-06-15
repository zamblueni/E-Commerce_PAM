import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductCard = ({ produto }) => {
  const { adicionarAoCarrinho } = useCart();

  const handleAdicionar = () => {
    adicionarAoCarrinho(produto);
    alert(`${produto.nome} adicionado ao carrinho!`);
  };

  return (
    <div className="product-card">
      <Link to={`/product/${produto._id}`}>
        <img src={produto.imagem} alt={produto.nome} />
        <h3>{produto.nome}</h3>
        <p>{produto.marca}</p>
        <p>R$ {produto.preco.toFixed(2)}</p>
        {produto.estoque === 0 && <p className="sem-estoque">Fora de estoque</p>}
      </Link>
      <button
        onClick={handleAdicionar}
        disabled={produto.estoque === 0}
      >
        Adicionar ao Carrinho
      </button>
    </div>
  );
};

export default ProductCard;