import React from "react";
import { useState } from "react";
import { Header } from "../../Header/Header";
import { Outlet } from "react-router-dom";
import { Notification } from "../../Notification/Notification";
import { useSelector, useDispatch } from "react-redux";
import { getIsShown } from "../../../redux/slices/notifySlice";
import useNotify from "../../hooks/useNotify";

function Root() {
  const style = {
    filter: 'blur(1px) grayscale(1)',
  };
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openCartDropdown, setOpenCartDropdown] = useState(false)
  const [blur, setBlur] = useState(false)
  const isShown = useSelector(getIsShown)
  const dispatch = useDispatch();
  const [toggleNotify]= useNotify()
  return (
    <div>
      <Header
        openDropdown={openDropdown}
        setOpenDropdown={setOpenDropdown}
        openCartDropdown={openCartDropdown}
        setOpenCartDropdown={setOpenCartDropdown}
        setBlur={setBlur}
      />
      <div className={blur ? 'layout-blur':'layout'}>
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
      {/* <button onClick={() => {
        toggleNotify('Text')
      }}>Show</button> */}
      {isShown && <Notification />}
    </div>
  );
}

export default Root;
