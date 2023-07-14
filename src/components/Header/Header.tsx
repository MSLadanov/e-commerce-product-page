import React from "react";
import { NavLink } from "react-router-dom";
import "./style.scss";

export const Header = () => {
  return (
    <nav>
      <div className="logo"></div>
      <div className="site-navbar">
        <NavLink to="men/">Men</NavLink>
        <NavLink to="women/">Women</NavLink>
        <NavLink to="about/">About</NavLink>
        <NavLink to="contact/">Contact</NavLink>
      </div>
      <div className="account-navbar"></div>
    </nav>
  );
};
