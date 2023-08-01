import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "../../redux/slices/userSlice";
import { fetchData } from "../../redux/slices/userSlice";
import { getUserData } from "../../redux/slices/userSlice";
import { NavLink } from "react-router-dom";
import { Dropdown } from "./Dropdown/Dropdown";
import "./style.scss";
import axios from "axios";
import { CartDropdown } from "./Dropdown/CartDropdown";

export const Header = ({
  openDropdown,
  setOpenDropdown,
  openCartDropdown,
  setOpenCartDropdown,
}: any) => {
  const dropdownBtnRef = useRef<HTMLInputElement>(null);
  const cartDropdownBtnRef = useRef<HTMLInputElement>(null);
  const token = useSelector(getToken);
  const userData = useSelector(getUserData);
  const [userImage, setUserImage] = useState("/images/image-user.png");
  const dispatch = useDispatch();

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
    }
  }, [token]);

  useEffect(() => {
    if (userData !== null) {
      setUserImage(`http://localhost:3001/${userData.img}`);
    }
  }, [userData]);

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
        <div ref={cartDropdownBtnRef} className="account-button">
          <img
            onClick={() => setOpenCartDropdown(true)}
            src="/images/icon-cart.svg"
            alt="cart"
          />
        </div>
        <div ref={dropdownBtnRef} className="account-button">
          <img
            onClick={() => setOpenDropdown(true)}
            src={userImage}
            alt="user"
          />
        </div>
      </div>
      <CartDropdown
        openCartDropdown={openCartDropdown}
        setOpenCartDropdown={setOpenCartDropdown}
        cartDropdownBtnRef={cartDropdownBtnRef}
        openDropdown={openDropdown}
        setOpenDropdown={setOpenDropdown}
        dropdownBtnRef={dropdownBtnRef}
      />
      <Dropdown
        token={token}
        openDropdown={openDropdown}
        setOpenDropdown={setOpenDropdown}
        userData={userData}
        userImage={userImage}
        setUserImage={setUserImage}
        dropdownBtnRef={dropdownBtnRef}
        openCartDropdown={openCartDropdown}
        setOpenCartDropdown={setOpenCartDropdown}
        cartDropdownBtnRef={cartDropdownBtnRef}
      />
    </nav>
  );
};
