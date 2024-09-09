import React from "react";
import { useRef, useEffect, useState } from "react";
import { SignedDropdown } from "./SignedDropdown";
import { UnsignedDropdown } from "./UnsignedDropdown";
import "./style.scss";

interface UserData {
  id: string,
  name: string,
  surname: string,
  email: string,
}

interface DropdownProps {
  token: string | null, 
  openDropdown: boolean, 
  setOpenDropdown: (state : boolean) => void, 
  userData: UserData | null, 
  userImage: string, 
  setUserImage: (state : string) => void, 
  dropdownBtnRef: React.RefObject<HTMLInputElement>, 
  openCartDropdown: boolean, 
  setOpenCartDropdown: (state : boolean) => void, 
  cartDropdownBtnRef: React.RefObject<HTMLInputElement>
}

export const Dropdown = ({ token, openDropdown, setOpenDropdown, userData, userImage, setUserImage, dropdownBtnRef , openCartDropdown, setOpenCartDropdown, cartDropdownBtnRef }: DropdownProps) => {
  const dropdownRef = useRef<HTMLInputElement>(null);
  console.log({userData})
  useEffect(() => {
    window.onclick = (event: any) => {
      if (
        !dropdownRef.current?.contains(event.target) &&
        !dropdownBtnRef.current?.contains(event.target) 
      ) {
        setOpenDropdown(false)
      } 
      if (
        !cartDropdownBtnRef.current?.contains(event.target) &&
        !cartDropdownBtnRef.current?.contains(event.target) 
      ) {
        setOpenCartDropdown(false)
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
