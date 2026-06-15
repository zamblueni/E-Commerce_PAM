import { useCart } from "../context/CartContext";

const CartItem = ({ item }) => {
  const { removerDoCarrinho } = useCart();

  return (
    <div className="cart-item">
      <img src={item.imagem} alt={item.nome} />
      <div>
        <h4>{item.nome}</h4>
        <p>R$ {item.preco.toFixed(2)}</p>
        <p>Quantidade: {item.quantidade}</p>
        <p>Subtotal: R$ {(item.preco * item.quantidade).toFixed(2)}</p>
      </div>
      <button onClick={() => removerDoCarrinho(item._id)}>Remover</button>
    </div>
  );
};

export default CartItem;