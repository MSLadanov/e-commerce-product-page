import React from "react";
import { useRef, useEffect, useState } from "react";
import { SignedDropdown } from "./SignedDropdown";
import { UnsignedDropdown } from "./UnsignedDropdown";
import "./style.scss";

export const CartDropdown = ({ token, openDropdown, setOpenDropdown, userData, userImage, setUserImage, dropdownBtnRef }: any) => {
  const dropdownRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    window.onclick = (event: any) => {
      if (
        !dropdownRef.current?.contains(event.target) &&
        !dropdownBtnRef.current?.contains(event.target) 
      ) {
        setOpenDropdown(false)
      } 
    };
  }, []);
  return (
    <div
      ref={dropdownRef}
      className={openDropdown ? "dropdown active" : "dropdown"}
    >
      <h1>Cart</h1>
    </div>
  );
};
