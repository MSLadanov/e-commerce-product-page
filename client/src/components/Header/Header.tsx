import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../redux/slices/userSlice";
import { getToken } from "../../redux/slices/userSlice";
import { fetchData } from "../../redux/slices/userSlice";
import { getUserData } from "../../redux/slices/userSlice";
import { NavLink } from "react-router-dom";
import { Dropdown } from '../Dropdown/Dropdown'
import "./style.scss";
import axios from "axios";
import { CartDropdown } from "../Dropdown/CartDropdown";
import useModal from "../../hooks/useModal";

export const Header = () => {
  const dropdownBtnRef = useRef<HTMLInputElement>(null);
  const cartDropdownBtnRef = useRef<HTMLInputElement>(null);
  const { toggleModal, handleModalType, Modal } = useModal()
  const mobileMenuBtnRef = useRef<HTMLInputElement>(null);
  const token = useSelector(getToken);
  const userData = useSelector(getUserData);
  const [userImage, setUserImage] = useState("/images/image-user.png");
  const dispatch = useDispatch();
  async function getUserInfo() {
    try {
      const res = await axios.get("http://localhost:3001/api/user/info/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(fetchData(res.data));
    } catch (error) {
      console.log(error);
    }
  }
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
    <>
      <nav>
        <div className="site-navbar">
          <div className="logo">
            <img src="/images/logo.svg" alt="logo" />
          </div>
          <NavLink to="men/">Men</NavLink>
          <NavLink to="women/">Women</NavLink>
          {token !== null && <NavLink to="orders/">My Orders</NavLink>}
          <NavLink to="about/">About</NavLink>
          <NavLink to="contact/">Contact</NavLink>
        </div>
        <div className="account-navbar">
          <div
            ref={cartDropdownBtnRef}
            className="account-button-cart"
            onClick={() => {
              handleModalType('cart')
              toggleModal()
            }}
          >
            <img src="/images/icon-cart.svg" alt="cart" />
          </div>
          <div ref={dropdownBtnRef} className="account-button-user">
            <img
              onClick={() => {
                handleModalType('account')
                toggleModal()
              }
              }
              src={userImage}
              alt="user"
            />
          </div>
        </div>
        <Modal />
      </nav>
    </>
  );
};
