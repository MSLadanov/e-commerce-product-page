import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getUserData } from "../../redux/slices/userSlice";
import useModal from "../../hooks/useModal";
import Burger from "../Burger/Burger";
import MobileNavbar from "../MobileNavbar/MobileNavbar";

export const MobileHeader = () => {
  const { toggleModal, handleModalType, handleOutSideClick, Modal } =
    useModal();
  const [openMenu, setOpenMenu] = useState(false);
  const userData = useSelector(getUserData);
  const [userImage, setUserImage] = useState("/images/image-user.png");
  useEffect(() => {
    if (userData.img) {
      setUserImage(`http://localhost:3001/${userData.img}`);
    }
  }, [userData]);
  return (
    <>
      <div className="mobile-navbar-wrapper">
        <Burger openMenu={openMenu} setOpenMenu={setOpenMenu}/>
        <div className="mobile-account-navbar">
          <div
            className="mobile-account-button-cart"
            onClick={(e) => {
              toggleModal();
              handleModalType("cart");
              handleOutSideClick(e);
            }}
          >
            <img src="/images/icon-cart.svg" alt="cart" />
          </div>
          <div
            className="mobile-account-button-user"
            onClick={(e) => {
              toggleModal();
              handleModalType("account");
              handleOutSideClick(e);
            }}
          >
            <img src={userImage} alt="user" />
          </div>
        </div>
      </div>
      <MobileNavbar openMenu={openMenu} setOpenMenu={setOpenMenu}/>
      <Modal />
    </>
  );
};
