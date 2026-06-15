import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

const OrdersPage = () => {
  const [pedidos, setPedidos] = useState([]);
  const { usuario } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!usuario) {
      navigate("/login");
      return;
    }

    const buscarPedidos = async () => {
      const token = JSON.parse(localStorage.getItem("usuario")).token;

      const { data } = await api.get("/orders/meus", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPedidos(data);
    };
    buscarPedidos();
  }, [usuario, navigate]);

  const statusCor = (status) => {
    if (status === "Pendente") return "status-pendente";
    if (status === "Enviado") return "status-enviado";
    if (status === "Entregue") return "status-entregue";
    return "";
  };

  return (
    <div className="orders-page">
      <h2>Meus Pedidos</h2>
      {pedidos.length === 0 ? (
        <p>Você ainda não fez nenhum pedido.</p>
      ) : (
        pedidos.map((pedido) => (
          <div key={pedido._id} className="order-card">
            <p>Pedido: {pedido._id}</p>
            <p>
              Status: <span className={statusCor(pedido.status)}>{pedido.status}</span>
            </p>
            <p>Total: R$ {pedido.total.toFixed(2)}</p>
            <p>Data: {new Date(pedido.createdAt).toLocaleDateString()}</p>
            <div>
              {pedido.itens.map((item) => (
                <div key={item.produto?._id}>
                  <p>
                    {item.produto?.nome} x {item.quantidade}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default OrdersPage;