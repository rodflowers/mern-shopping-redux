import "./HomeScreen.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// Component
import Product from "../components/Product";

// Actions
import { getProducts as listProducts } from "../redux/actions/productActions";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const getProducts = useSelector((state) => state.getProducts);
  const { products, loading, error } = getProducts;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <div className="homescreen">
      <h2 className="homescreen__title">Productos</h2>
      <div className="homescreen__products">
        {loading ? (
          <h2>Loading...</h2>
        ) : error ? (
          <h2>{error}</h2>
        ) : Array.isArray(products.data) ? (
          products.data.map((p) => (
            <Product
              key={p._id}
              name={p.name}
              imageUrl={p.imageUrl}
              price={p.price}
              productId={p._id}
              desc={p.description}
            />
          ))
        ) : null}
      </div>
    </div>
  );
};

export default HomeScreen;
