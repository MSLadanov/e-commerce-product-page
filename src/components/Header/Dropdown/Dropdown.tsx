import React from "react";
import { useRef, useEffect, useState } from "react";
import { SignedDropdown } from "./SignedDropdown";
import { UnsignedDropdown } from "./UnsignedDropdown";
import "./style.scss";

export const Dropdown = ({ token, openDropdown, setOpenDropdown, userData, userImage, setUserImage, dropdownBtnRef }: any) => {
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
  if (token !== null && userData !== null) {
    return (
      <div
        ref={dropdownRef}
        className={openDropdown ? "dropdown active" : "dropdown"}
      >
        <SignedDropdown userImage={userImage} setUserImage={setUserImage} />
      </div>
    );
  } else {
    return (
      <div
        ref={dropdownRef}
        className={openDropdown ? "dropdown active" : "dropdown"}
      >
        <UnsignedDropdown />
      </div>
    );
  }
};
