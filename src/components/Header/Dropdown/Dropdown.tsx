import React from "react";
import { useRef, useEffect, useState } from "react";
import { SignedDropdown } from "./SignedDropdown";
import { UnsignedDropdown } from "./UnsignedDropdown";
import "./style.scss";

export const Dropdown = ({ token }: any) => {
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
  if (token !== null) {
    return (
      <div
        ref={dropdownRef}
        className={isActive ? "dropdown active" : "dropdown"}
      >
        <SignedDropdown />
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
