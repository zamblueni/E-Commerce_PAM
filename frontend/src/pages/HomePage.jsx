import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="home-page">
      <h1>🏒 Zamboni Sports</h1>
      <p>Artigos esportivos de alta qualidade!</p>
      <p>Equipe-se com os melhores produtos do mercado.</p>
      <Link to="/products">
        <button>Ver Produtos</button>
      </Link>
    </div>
  );
};

export default HomePage;