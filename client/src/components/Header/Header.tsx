import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../redux/slices/userSlice";
import { getToken } from "../../redux/slices/userSlice";
import { fetchData } from "../../redux/slices/userSlice";
import { getUserData } from "../../redux/slices/userSlice";
import { NavLink } from "react-router-dom";
import { Dropdown } from "./Dropdown/Dropdown";
import "./style.scss";
import axios from "axios";
import { CartDropdown } from "./Dropdown/CartDropdown";

interface HeaderProps {
  openDropdown: boolean,
  setOpenDropdown: (state: boolean) => void,
  openCartDropdown: boolean,
  setOpenCartDropdown: (state: boolean) => void,
  setBlur: (state: boolean) => void,
  setOpenMobileDropdown: (state: null | string) => void,
  openMobileDropdown: null | string,
  toggleMobileMenu: (mobileMenuBtnRef : React.RefObject<HTMLInputElement>, mobileMenuRef : React.RefObject<HTMLInputElement>) => void,
  openSideMenu: boolean,
  setOpenSideMenu: (state: boolean) => void,
}

export const Header = ({
  openDropdown,
  setOpenDropdown,
  openCartDropdown,
  setOpenCartDropdown,
  setBlur,
  setOpenMobileDropdown,
  openMobileDropdown,
  toggleMobileMenu,
  openSideMenu,
  setOpenSideMenu
}: HeaderProps) => {
  const dropdownBtnRef = useRef<HTMLInputElement>(null);
  const cartDropdownBtnRef = useRef<HTMLInputElement>(null);

  const mobileMenuBtnRef = useRef<HTMLInputElement>(null);
  const mobileMenuRef = useRef<HTMLInputElement>(null);

  const token = useSelector(getToken);
  const userData = useSelector(getUserData);
  const [userImage, setUserImage] = useState("/images/image-user.png");
  const dispatch = useDispatch();

  const toggleMobileDropdown = (dropdownType:string) => {
    setOpenMobileDropdown(dropdownType)
    setBlur(true)
  }

  const getUserInfo = async () => {
    await axios
      .get("http://localhost:3001/api/user/info/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch(fetchData(res.data));
      }).catch((err) => {
        if(err.response.status === 401){
          dispatch(signOut())
        }
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
    <>
    <div className="mobile-navbar-wrapper">
      <div className="logo-mobile" ref={mobileMenuBtnRef} onClick={(e) => {
        toggleMobileMenu(mobileMenuBtnRef, mobileMenuRef)
        }}>
        <div className="burger"></div>
        <div className="burger"></div>
        <div className="burger"></div>
      </div>
      <div className="mobile-account-navbar">
          <div
            ref={cartDropdownBtnRef}
            className="mobile-account-button-cart"
            onClick={(e) => {
              toggleMobileDropdown('cart')
            }}
          >
            <img src="/images/icon-cart.svg" alt="cart" />
          </div>
          <div ref={dropdownBtnRef} className="mobile-account-button-user"  onClick={() => toggleMobileDropdown('account')}>
            <img
              src={userImage}
              alt="user"
            />
          </div>
        </div>
    </div>
      <nav ref={mobileMenuRef} className={openSideMenu ? 'showed' : undefined}>
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
              setOpenCartDropdown(true)
            }}
          >
            <img src="/images/icon-cart.svg" alt="cart" />
          </div>
          <div ref={dropdownBtnRef} className="account-button-user">
            <img
              onClick={() => setOpenDropdown(true)}
              src={userImage}
              alt="user"
            />
          </div>
        </div>
        <CartDropdown
          openCartDropdown={openCartDropdown}
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
    </>
  );
};
