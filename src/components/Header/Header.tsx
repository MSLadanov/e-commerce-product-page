import React from "react";
import { NavLink } from "react-router-dom";
import "./style.scss";

export const Header = () => {
  return (
    <nav>
      <NavLink to="men/">Men</NavLink>
      <NavLink to="women/">Women</NavLink>
      <NavLink to="about/">About</NavLink>
      <NavLink to="contact/">Contact</NavLink>
    </nav>
  );
};
