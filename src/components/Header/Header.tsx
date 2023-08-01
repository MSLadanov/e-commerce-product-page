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

export const Header = ({ openDropdown, setOpenDropdown }: any) => {
  const dropdownBtnRef = useRef<HTMLInputElement>(null);
  const token = useSelector(getToken);
  const userData = useSelector(getUserData);
  const [userImage, setUserImage] = useState("/images/image-user.png");
  const dispatch = useDispatch();

  const [isActive, setIsActive] = useState(false);
  const btnDropDownRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLInputElement>(null);

  const onClick = (e: any) => {
    setIsActive(!isActive);
  };

  // useEffect(() => {
  //   window.onclick = (event: any) => {
  //     if (event.target !== btnDropDownRef.current) {
  //       if (
  //         !dropdownRef.current?.contains(event.target) &&
  //         !dropdownRef.current?.contains(event.target)
  //       ) {
  //         setIsActive(false);
  //         if(!event.composedPath().find((item: any) => item.className === 'dropdown active') && !event.composedPath().find((item: any) => item.className === 'account-button')){
  //           setOpenDropdown(false)
  //         }
  //       }
  //     }
  //   };
  // }, []);

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
      <div className="cart-dropdown">
            {/* dropdown */}
            <div className="cart-dropdown__container">
              {/* Dropdown Button */}
              <div
                className="cart-dropdown__btn"
                ref={btnDropDownRef}
                onClick={(e) => onClick(e)}
              >
                <img src="/images/icon-cart.svg" alt="" />
              </div>

              {/* Dropdown Content */}
              <div
                ref={dropdownRef}
                className={`cart-dropdown__content ${isActive ? "open" : "close"}`}
              >
                <div className="cart-dropdown__info">
                  <h1>Cart</h1>
                </div>
              </div>
            </div>
            {/* dropdown */}
          </div>
        <div ref={dropdownBtnRef} className="account-button">
          <img
            onClick={() => setOpenDropdown(true)}
            src={userImage}
            alt="user"
          />
        </div>
      </div>
      <Dropdown
        token={token}
        openDropdown={openDropdown}
        setOpenDropdown={setOpenDropdown}
        userData={userData}
        userImage={userImage}
        setUserImage={setUserImage}
        dropdownBtnRef={dropdownBtnRef}
      />
    </nav>
  );
};
