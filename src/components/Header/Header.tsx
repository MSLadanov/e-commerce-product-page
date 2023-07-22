import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "../../redux/slices/userSlice";
import { getData } from "../../redux/slices/userDataSlice";
import { NavLink } from "react-router-dom";
import { Dropdown } from "./Dropdown/Dropdown";
import "./style.scss";
import axios from "axios";

export const Header = () => {
  const token = useSelector(getToken);
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(false);
  const getUserInfo = async () => {
    const userInfo = await axios.get('http://localhost:3001/api/user/info/',{
			headers: {
				'Authorization': `Bearer ${token}`,
			}
		}).then((res) => {
      dispatch(getData(res.data))
    }) 
  }
  if(token !== null){
    getUserInfo()
  }
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
        token={token}
        openDropdown={openDropdown}
        setOpenDropdown={setOpenDropdown}
      />
    </nav>
  );
};
