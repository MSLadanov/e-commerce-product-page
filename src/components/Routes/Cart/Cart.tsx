import React from 'react'
import { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { getCartData } from "../../../redux/slices/cartSlice";
import { removeSneaker } from "../../../redux/slices/cartSlice";
import { useDispatch } from "react-redux";
import { getToken } from "../../../redux/slices/userSlice";
import "./style.scss";

export const Cart = () => {
  const dropdownCartRef = useRef<HTMLInputElement>(null);
  const cartData = useSelector(getCartData);
  const dispatch = useDispatch();
  const token = useSelector(getToken);
  if (!cartData.length) {
    return (
      <>
        <h1>Cart</h1>
        <h2>Your cart is empty</h2>
      </>
    );
  }
  return (
    <div>{cartData.map((item: any) => (
      <div className='cart-item' key={item.cart_id}>
        <img src={`http://localhost:3001/${item.img}`} alt="" />
        <p>{item.brand + " " + item.name + ", " + " Size: " + item.size}</p>
        <p>{item.price + " " + "$"}</p>
        <img
          className="delete-icon"
          onClick={() => dispatch(removeSneaker(item.cart_id))}
          src="/images/icon-delete.svg"
          alt="cart"
        />
      </div>
    ))}
    {token !== null ?<button className='cart-btn'>Make order</button>:<div className='center'><h1>You must be logged in to complete your order!</h1></div>}
  </div>
  )
}
