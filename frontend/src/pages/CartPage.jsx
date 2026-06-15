import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import CartItem from "../components/CartItem";
import api from "../services/api";

const CartPage = () => {
  const { carrinho, limparCarrinho } = useCart();
  const { usuario } = useAuth();
  const navigate = useNavigate();

  const total = carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);

  const finalizarPedido = async () => {
    if (!usuario) {
      navigate("/login");
      return;
    }

    const itens = carrinho.map((item) => ({
      produto: item._id,
      quantidade: item.quantidade,
    }));

    try {
      const token = JSON.parse(localStorage.getItem("usuario")).token;

      await api.post(
        "/orders",
        { itens, total },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      limparCarrinho();
      alert("Pedido realizado com sucesso!");
      navigate("/orders");
    } catch (error) {
      alert("Erro ao finalizar pedido");
    }
  };

  return (
    <div className="cart-page">
      <h2>Carrinho de Compras</h2>
      {carrinho.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <>
          {carrinho.map((item) => (
            <CartItem key={item._id} item={item} />
          ))}
          <div>
            <h3>Total: R$ {total.toFixed(2)}</h3>
            <button onClick={finalizarPedido}>Finalizar Pedido</button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;