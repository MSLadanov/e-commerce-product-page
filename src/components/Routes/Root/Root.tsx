import React from "react";
import { useState } from "react";
import { Header } from "../../Header/Header";
import { Outlet } from "react-router-dom";
import { Notification } from "../../Notification/Notification";
import { useSelector, useDispatch } from "react-redux";
import { getIsShown } from "../../../redux/slices/notifySlice";
import { showNotify, hideNotify } from "../../../redux/slices/notifySlice";

function Root() {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openCartDropdown, setOpenCartDropdown] = useState(false)
  const isShown = useSelector(getIsShown)
  const dispatch = useDispatch();
  return (
    <div >
      <Header openDropdown={openDropdown} setOpenDropdown={setOpenDropdown} openCartDropdown={openCartDropdown} setOpenCartDropdown={setOpenCartDropdown} />
      <Outlet context={[openDropdown, setOpenDropdown, openCartDropdown, setOpenCartDropdown]}/>
      <button onClick={() => {
        dispatch(showNotify())
        setTimeout(() => {
          dispatch(hideNotify())
        }, 2000);
      }}>Show</button>
      {isShown && <Notification/>}
    </div>
  );
}

export default Root;
