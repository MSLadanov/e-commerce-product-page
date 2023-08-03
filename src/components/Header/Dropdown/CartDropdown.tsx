import React from "react";
import { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { getCartData } from "../../../redux/slices/cartSlice";
import { useDispatch } from "react-redux";
import "./style.scss";

export const CartDropdown = ({ openCartDropdown, setOpenCartDropdown, cartDropdownBtnRef, openDropdown, setOpenDropdown, dropdownBtnRef }: any) => {
  const dropdownCartRef = useRef<HTMLInputElement>(null);
  const cartData = useSelector(getCartData);
  const dispatch = useDispatch()
  return (
    <div
      ref={dropdownCartRef}
      className={openCartDropdown ? "cart-dropdown active" : "cart-dropdown"}
    >
      <h1>Cart</h1>
      <hr />
      {cartData.map((item : any) => 
        <div>
          <img src={`http://localhost:3001/${item.img}`} alt="" />
          <p>{item.brand + ' ' + item.name}</p>
          <img
          className="delete-icon"
            onClick={() => console.log('remove')}
            src="/images/icon-delete.svg"
            alt="cart"
          />
        </div>
      )}
    </div>
  );
};
