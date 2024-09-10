import React from "react";
import { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { getCartData } from "../../../redux/slices/cartSlice";
import { removeSneaker } from "../../../redux/slices/cartSlice";
import { useDispatch } from "react-redux";
import { getToken } from "../../../redux/slices/userSlice";
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

export const CartDropdown = ({ openCartDropdown} : {openCartDropdown: boolean}) => {
  const dropdownCartRef = useRef<HTMLInputElement>(null);
  const cartData = useSelector(getCartData);
  const dispatch = useDispatch();
  const token = useSelector(getToken);
  console.log(cartData)
  if (!cartData.length) {
    return (
      <div
        ref={dropdownCartRef}
        className={openCartDropdown ? "cart-dropdown active" : "cart-dropdown"}
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
      ref={dropdownCartRef}
      className={openCartDropdown ? "cart-dropdown active" : "cart-dropdown"}
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
