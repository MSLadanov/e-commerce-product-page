import React from "react";
import { useRef, useEffect, useState } from "react";
import { SignedDropdown } from "./SignedDropdown";
import { UnsignedDropdown } from "./UnsignedDropdown";
import { useSelector } from "react-redux";
import { getUserData } from "../../redux/slices/userSlice";
import "./style.scss";

interface UserData {
  id: string,
  name: string,
  surname: string,
  email: string,
}

export const Dropdown = () => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const userData = useSelector(getUserData);
  const { token } = useSelector(getUserData)
  const { img  } = useSelector(getUserData)
  if (token && img) {
    return (
      <div
        ref={dropdownRef}
        className={"dropdown active"}
      >
        <SignedDropdown userImage={img} />
      </div>
    );
  } else {
    return (
      <div
        ref={dropdownRef}
        className={"dropdown active"}
      >
        <UnsignedDropdown />
      </div>
    );
  }
};
