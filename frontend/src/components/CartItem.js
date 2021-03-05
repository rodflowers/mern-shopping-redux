import "./CartItem.css";
import { Link } from "react-router-dom";

const CartItem = ({ item, qtyChangeHandler }) => {
  console.log("ITEM ==> ", item);
  return (
    <div className="cartitem">
      <div className="cartitem__image">
        <img src={item.data.data.imageUrl} alt={item.data.data.name} />
      </div>
      <Link to={`/product/${item.data.data._id}`} className="cartitem__name">
        <p>{item.data.data.name}</p>
      </Link>
      <p className="cartitem__price">${item.data.data.price}</p>
      <select
        className="cartitem__select"
        value={item.qty}
        onChange={(e) => qtyChangeHandler(item.data.data._id, e.target.value)}
      >
        {[...Array(item.data.data.countInStock).keys()].map((x) => (
          <option key={x + 1} value={x + 1}>
            {x + 1}
          </option>
        ))}
      </select>
      <button className="cartitem__deleteBtn">
        <i className="fas fa-trash"></i>
      </button>
    </div>
  );
};

export default CartItem;
