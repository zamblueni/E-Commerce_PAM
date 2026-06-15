import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const Header = () => {
  const { usuario, logout } = useAuth();
  const { carrinho } = useCart();

  return (
    <header>
      <nav>
        <Link to="/" style={{ textDecoration: "none" }}>
          <h1>🏒 Zamboni Sports</h1>
        </Link>
        <div>
          <Link to="/products">Produtos</Link>
          <Link to="/cart">
            🛒 Carrinho ({carrinho.length})
          </Link>
          {usuario ? (
            <>
              <Link to="/orders">Meus Pedidos</Link>
              {usuario.administrador && (
                <Link to="/admin">Admin</Link>
              )}
              <button onClick={logout}>Sair</button>
              <span>Olá, {usuario.nome}</span>
            </>
          ) : (
            <>
              <Link to="/login">Entrar</Link>
              <Link to="/register">Cadastrar</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;