import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "../../redux/slices/userSlice";
import { fetchData } from "../../redux/slices/userSlice";
import { getUserData } from "../../redux/slices/userSlice";
import { NavLink } from "react-router-dom";
import { Dropdown } from "./Dropdown/Dropdown";
import "./style.scss";
import axios from "axios";

export const Header = () => {
  const token = useSelector(getToken);
  const userData = useSelector(getUserData);
  const [userImage, setUserImage] = useState("/images/image-user.png");
  const dispatch = useDispatch();
  const [openDropdown, setOpenDropdown] = useState(false);
  const getUserInfo = async () => {
    await axios
      .get("http://localhost:3001/api/user/info/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch(fetchData(res.data));
      });
  };
  useEffect(() => {
    if (token !== null) {
      getUserInfo();
      if (userData !== null) {
        setUserImage(`http://localhost:3001/${userData.img}`);
      }
    }
  }, []);
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
            src={userImage}
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
