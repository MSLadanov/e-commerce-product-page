import React from "react";
import { useState, useRef } from "react";
import { Header } from "../../Header/Header";
import { Outlet } from "react-router-dom";
import { Notification } from "../../Notification/Notification";
import { useSelector, useDispatch } from "react-redux";
import { getIsShown } from "../../../redux/slices/notifySlice";
import useNotify from "../../../hooks/useNotify";
import { MobileDropdown } from "../../MobileDropdown/MobileDropdown";
import { Footer } from "../../Footer/Footer";
import useModal from "../../../hooks/useModal";

function Root() {
  const isShown = useSelector(getIsShown)
  const {toggleModal, Modal} = useModal()
  return (
    <div>
      <Header/>
      <div>
        <Outlet
          // context={[
          //   openDropdown,
          //   setOpenDropdown,
          //   openCartDropdown,
          //   setOpenCartDropdown,
          //   blur,
          // ]}
        />
      </div>
      <Modal />
      <Footer></Footer>
      {isShown && <Notification />}
    </div>
  );
}

export default Root;
