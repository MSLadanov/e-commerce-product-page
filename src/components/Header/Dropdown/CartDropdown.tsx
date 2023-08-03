import React from "react";
import { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { getCartData } from "../../../redux/slices/cartSlice";
import { useDispatch } from "react-redux";
import "./style.scss";

export const CartDropdown = ({ openCartDropdown, setOpenCartDropdown, cartDropdownBtnRef, openDropdown, setOpenDropdown, dropdownBtnRef }: any) => {
  const dropdownCartRef = useRef<HTMLInputElement>(null);
  const cartData = useSelector(getCartData);
  console.log(cartData)
  const dispatch = useDispatch()
  return (
    <div
      ref={dropdownCartRef}
      className={openCartDropdown ? "cart-dropdown active" : "cart-dropdown"}
    >
      <p>sdfsd</p>
    </div>
  );
};
