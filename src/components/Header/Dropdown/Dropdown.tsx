import React from "react";
import { useRef, useEffect, useState } from "react";
import { SignedDropdown } from "./SignedDropdown";
import { UnsignedDropdown } from "./UnsignedDropdown";
import "./style.scss";

export const Dropdown = ({ token, userImage, userData, setUserImage }: any) => {
  const dropdownRef = useRef<HTMLInputElement>(null);
  const [isActive, setActive] = useState(false);
  useEffect(() => {
    window.onclick = (event: any) => {
      if (
        event.target.contains(dropdownRef.current) &&
        event.target !== dropdownRef.current
      ) {
        setActive(false);
      } else {
        setActive(true);
      }
    };
  }, []);
  if (token !== null && userData !== null) {
    return (
      <div
        ref={dropdownRef}
        className={isActive ? "dropdown active" : "dropdown"}
      >
        <SignedDropdown userImage={userImage} setUserImage={setUserImage} />
      </div>
    );
  } else {
    return (
      <div
        ref={dropdownRef}
        className={isActive ? "dropdown active" : "dropdown"}
      >
        <UnsignedDropdown />
      </div>
    );
  }
};
