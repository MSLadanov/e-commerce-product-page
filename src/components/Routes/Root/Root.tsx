import React from "react";
import { useState } from "react";
import { Header } from "../../Header/Header";
import { Outlet } from "react-router-dom";

function Root() {
  const [openDropdown, setOpenDropdown] = useState(false);
  return (
    <div >
      <Header openDropdown={openDropdown} setOpenDropdown={setOpenDropdown} />
      <Outlet context={[openDropdown, setOpenDropdown]}/>
    </div>
  );
}

export default Root;
