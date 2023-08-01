import React from "react";
import { useRef, useEffect } from "react";
import "./style.scss";

export const CartDropdown = ({ openCartDropdown, setOpenCartDropdown, cartDropdownBtnRef, openDropdown, setOpenDropdown, dropdownBtnRef }: any) => {
  const dropdownCartRef = useRef<HTMLInputElement>(null);
  // useEffect(() => {
  //   window.onclick = (event: any) => {
  //     console.log('cdfs')
  //     if (
  //       !dropdownCartRef.current?.contains(event.target) &&
  //       !cartDropdownBtnRef.current?.contains(event.target) 
  //     ) {
  //       setOpenCartDropdown(false)
  //     } 
  //   };
  // }, []);
  return (
    <div
      ref={dropdownCartRef}
      className={openCartDropdown ? "dropdown active" : "dropdown"}
    >
      <h1>Cart</h1>
    </div>
  );
};
