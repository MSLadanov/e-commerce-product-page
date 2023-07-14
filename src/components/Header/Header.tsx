import React from "react";
import { NavLink } from "react-router-dom";
import "./style.scss";

export const Header = () => {
  return (
    <nav>
      <div className="logo">
        <img src="/images/logo.svg" alt="logo" />
      </div>
      <div className="site-navbar">
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
          <img src="/images/image-user.png" alt="user" />
        </div>
      </div>
    </nav>
  );
};
