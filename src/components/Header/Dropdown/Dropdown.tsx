import React from "react";
import { useRef, useEffect, useState } from "react";
import { SignedDropdown } from "./SignedDropdown";
import { UnsignedDropdown } from "./UnsignedDropdown";
import "./style.scss";

export const Dropdown = ({ token, openDropdown, setOpenDropdown, userData, userImage, setUserImage }: any) => {
  const dropdownRef = useRef<HTMLInputElement>(null);
  const [isActive, setActive] = useState(false);
  useEffect(() => {
    window.onclick = (event: any) => {
      // console.log(document.body)
      console.log(openDropdown)
      console.log(dropdownRef.current?.contains(event.target))
      // console.log(event.target.contains(dropdownRef.current))
      // console.log(event.target !== dropdownRef.current)
      if (
        // event.target.contains(dropdownRef.current) &&
        // event.target !== dropdownRef.current
        dropdownRef.current?.contains(event.target)
      ) {
        console.log('open')
      } else {
        console.log('close')
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
