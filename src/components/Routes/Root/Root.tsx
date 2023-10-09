import React from "react";
import { useState, useRef } from "react";
import { Header } from "../../Header/Header";
import { Outlet } from "react-router-dom";
import { Notification } from "../../Notification/Notification";
import { useSelector, useDispatch } from "react-redux";
import { getIsShown } from "../../../redux/slices/notifySlice";
import useNotify from "../../hooks/useNotify";
import { MobileDropdown } from "../../MobileDropdown/MobileDropdown";

function Root() {
  const style = {
    filter: 'blur(1px) grayscale(1)',
  };
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openCartDropdown, setOpenCartDropdown] = useState(false)
  const [blur, setBlur] = useState(false)
  const isShown = useSelector(getIsShown)
  const [openMobileDropdown, setOpenMobileDropdown] = useState(null)
  const mobileMenuRef = useRef<HTMLElement>(null);
  const dispatch = useDispatch();
  const [toggleNotify]= useNotify();

  const [openSideMenu, setOpenSideMenu] = useState(false)

  const toggleMobileMenu = (mobileMenuBtnRef : any, mobileMenuRef : any) => {
    if(!mobileMenuRef.current?.scrollWidth){
      mobileMenuBtnRef.current?.children[0].classList.add('rotate-up')
      mobileMenuBtnRef.current?.children[1].classList.add('hiding')
      mobileMenuBtnRef.current?.children[2].classList.add('rotate-down')
      setOpenSideMenu(true)
      setBlur(true)
    } else{
      mobileMenuBtnRef.current?.children[0].classList.remove('rotate-up')
      mobileMenuBtnRef.current?.children[1].classList.remove('hiding')
      mobileMenuBtnRef.current?.children[2].classList.remove('rotate-down')
      setOpenSideMenu(false)
      setBlur(false)
      if(openMobileDropdown){
        setBlur(true)
      }
    }
  }
  const closeModal = () => {
    if(openMobileDropdown){
      setOpenMobileDropdown(null)
      setBlur(false);
    }
    setOpenSideMenu(false)
    const mobileMenuBtn = document.querySelector('.logo-mobile')
    mobileMenuBtn?.children[0].classList.remove('rotate-up')
    mobileMenuBtn?.children[1].classList.remove('hiding')
    mobileMenuBtn?.children[2].classList.remove('rotate-down')
    setBlur(false)
  }
  return (
    <div>
      <Header
        openDropdown={openDropdown}
        setOpenDropdown={setOpenDropdown}
        openCartDropdown={openCartDropdown}
        setOpenCartDropdown={setOpenCartDropdown}
        setBlur={setBlur}
        setOpenMobileDropdown={setOpenMobileDropdown}
        openMobileDropdown={openMobileDropdown}
        toggleMobileMenu={toggleMobileMenu}
        openSideMenu={openSideMenu}
        setOpenSideMenu={setOpenSideMenu}
      />
      <div className={blur ? 'layout-blur':'layout'} onClick={() => {closeModal()}}>
        <Outlet
          context={[
            openDropdown,
            setOpenDropdown,
            openCartDropdown,
            setOpenCartDropdown,
            blur,
          ]}
        />
      </div>
      {isShown && <Notification />}
      {openMobileDropdown && <MobileDropdown openMobileDropdown={openMobileDropdown} />}
    </div>
  );
}

export default Root;
