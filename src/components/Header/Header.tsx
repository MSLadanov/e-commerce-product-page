import React from "react";
import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { Dropdown } from "./Dropdown/Dropdown";
import "./style.scss";

export const Header = () => {
  const [logged, setLogged] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  return (
    <nav>
      <div className="site-navbar">
        <div className="logo">
          <img src="/images/logo.svg" alt="logo" />
        </div>
        <NavLink to="men/">Men</NavLink>
        <NavLink to="women/">Women</NavLink>
        <NavLink to="about/">About</NavLink>
        <NavLink to="contact/">Contact</NavLink>
      </div>
      <div className="account-navbar">
        <div className="cart-button">
          <img src="/images/icon-cart.svg" alt="cart" />
        </div>
        <div className="account-button">
          <img
            onClick={() => setOpenDropdown((prev) => !prev)}
            src="/images/image-user.png"
            alt="user"
          />
        </div>
      </div>
      <Dropdown
        logged={logged}
        openDropdown={openDropdown}
        setOpenDropdown={setOpenDropdown}
      />
    </nav>
  );
};