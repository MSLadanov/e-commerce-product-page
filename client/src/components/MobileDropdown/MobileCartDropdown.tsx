import { useSelector } from "react-redux";
import { getCartData } from "../../redux/slices/cartSlice";
import { removeSneaker } from "../../redux/slices/cartSlice";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import "./style.scss";

interface CartSneaker {
  brand: string,
  cart_id: string,
  id: number,
  img: string,
  name: string,
  size: string,
  price: number,
}

export const MobileCartDropdown = () => {
  const cartData = useSelector(getCartData);
  const dispatch = useDispatch();
  if (!cartData.length) {
    return (
      <div
        className="cart-dropdown active"
      >
        <h1>Cart</h1>
        <hr />
        <div className="empty-cart">
          <h2>Your cart is empty</h2>
        </div>
      </div>
    );
  }
  return (
    <div
      className="cart-dropdown active" 
    >
      <h1>Cart</h1>
      <hr />
      {cartData.map((item: CartSneaker) => (
        <div key={item.cart_id}>
          <img src={`http://localhost:3001/${item.img}`} alt="" />
          <p>{item.brand + " " + item.name}</p>
          <img
            className="delete-icon"
            onClick={() => dispatch(removeSneaker(item.cart_id))}
            src="/images/icon-delete.svg"
            alt="cart"
          />
        </div>
      ))}
      <div className="cart-btn">
        <NavLink to="cart/">Cart</NavLink>
      </div>
    </div>
  );
};
