import { useState, useEffect } from "react";
import api from "../services/api";
import ProductCard from "../components/ProductCard";

const ProductsPage = () => {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    const buscarProdutos = async () => {
      const { data } = await api.get("/products");
      setProdutos(data);
    };
    buscarProdutos();
  }, []);

  return (
    <div className="products-page">
      <h2>Produtos</h2>
      {produtos.length === 0 ? (
        <p>Nenhum produto cadastrado ainda.</p>
      ) : (
        <div className="products-grid">
          {produtos.map((produto) => (
            <ProductCard key={produto._id} produto={produto} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;