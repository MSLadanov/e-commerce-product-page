import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserData } from "../../redux/slices/userSlice";
import "./style.scss";

interface MobileNavbarProps {
  openMenu: boolean;
  setOpenMenu: (state: boolean) => void;
}

function MobileNavbar({ openMenu, setOpenMenu }: MobileNavbarProps) {
  const userData = useSelector(getUserData);
  return (
    <div className={openMenu ? "mobile-navbar-background shaded" : "mobile-navbar-background"}>
      <div
        className={openMenu ? "mobile-site-navbar open" : "mobile-site-navbar"}
      >
        <div className="logo">
          <img src="/images/logo.svg" alt="logo" />
        </div>
        <NavLink to="men/">Men</NavLink>
        <NavLink to="women/">Women</NavLink>
        {userData.token && <NavLink to="orders/">My Orders</NavLink>}
        <NavLink to="about/">About</NavLink>
        <NavLink to="contact/">Contact</NavLink>
      </div>
    </div>
  );
}

export default MobileNavbar;
