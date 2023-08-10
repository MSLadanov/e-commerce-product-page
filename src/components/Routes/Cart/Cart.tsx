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
  return (
    <div>{cartData.map((item: any) => (
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
  </div>
  )
}
