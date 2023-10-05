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

export const Header = ({
  openDropdown,
  setOpenDropdown,
  openCartDropdown,
  setOpenCartDropdown,
  setBlur
}: any) => {
  const dropdownBtnRef = useRef<HTMLInputElement>(null);
  const cartDropdownBtnRef = useRef<HTMLInputElement>(null);

  const mobileMenuBtnRef = useRef<HTMLInputElement>(null);
  const mobileMenuRef = useRef<HTMLInputElement>(null);

  const token = useSelector(getToken);
  const userData = useSelector(getUserData);
  const [userImage, setUserImage] = useState("/images/image-user.png");
  const dispatch = useDispatch();

  const toggleMobileMenu = (e:any) => {
    if(!mobileMenuRef.current?.scrollWidth){
      mobileMenuBtnRef.current?.children[0].classList.add('rotate-up')
      mobileMenuBtnRef.current?.children[1].classList.add('hiding')
      mobileMenuBtnRef.current?.children[2].classList.add('rotate-down')
      mobileMenuRef.current?.classList.add('showed')
      setBlur(true)
    } else{
      mobileMenuBtnRef.current?.children[0].classList.remove('rotate-up')
      mobileMenuBtnRef.current?.children[1].classList.remove('hiding')
      mobileMenuBtnRef.current?.children[2].classList.remove('rotate-down')
      mobileMenuRef.current?.classList.remove('showed')
      setBlur(false)
    }
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
      <div className="logo-mobile" ref={mobileMenuBtnRef} onClick={(e) => toggleMobileMenu(e)}>
        <div className="burger"></div>
        <div className="burger"></div>
        <div className="burger"></div>
      </div>
      <nav ref={mobileMenuRef}>
        <div className="site-navbar">
          <div className="logo">
            <img src="/images/logo.svg" alt="logo" />
          </div>
          <NavLink to="men/">Men</NavLink>
          <NavLink to="women/">Women</NavLink>
          {token !== null && <NavLink to="orders/">My Orders</NavLink>}
          <NavLink to="about/">About</NavLink>
          <NavLink to="contact/">Contact</NavLink>
          <NavLink className='mobile-btn' to="/" onClick={() => setOpenDropdown(true)}>User</NavLink>
          <NavLink className='mobile-btn' to="/" onClick={() => setOpenCartDropdown(true)}>Cart</NavLink>
        </div>
        <div className="account-navbar">
          <div
            ref={cartDropdownBtnRef}
            className="account-button-cart"
            onClick={() => setOpenCartDropdown(true)}
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
    </>
  );
};
