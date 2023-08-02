import React from "react";
import { useRef, useEffect } from "react";
import "./style.scss";

export const CartDropdown = ({ openCartDropdown, setOpenCartDropdown, cartDropdownBtnRef, openDropdown, setOpenDropdown, dropdownBtnRef }: any) => {
  const dropdownCartRef = useRef<HTMLInputElement>(null);
  return (
    <div
      ref={dropdownCartRef}
      className={openCartDropdown ? "cart-dropdown active" : "cart-dropdown"}
    >
      <h1>Cart</h1>
    </div>
  );
};
