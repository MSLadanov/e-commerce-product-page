import React from "react";
import { useState } from "react";
import { Header } from "../../Header/Header";
import { Outlet } from "react-router-dom";

function Root() {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openCartDropdown, setOpenCartDropdown] = useState(false)
  return (
    <div >
      <Header openDropdown={openDropdown} setOpenDropdown={setOpenDropdown} openCartDropdown={openCartDropdown} setOpenCartDropdown={setOpenCartDropdown} />
      <Outlet context={[openDropdown, setOpenDropdown, openCartDropdown, setOpenCartDropdown]}/>
    </div>
  );
}

export default Root;
