import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getUserData } from "../../redux/slices/userSlice";
import useModal from "../../hooks/useModal";

export const MobileHeader = () => {
  const { toggleModal, handleModalType, Modal } = useModal();
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
        <div className="logo-mobile">
          <div className="burger"></div>
          <div className="burger"></div>
          <div className="burger"></div>
        </div>
        <div className="mobile-account-navbar">
          <div className="mobile-account-button-cart">
            <img src="/images/icon-cart.svg" alt="cart" />
          </div>
          <div className="mobile-account-button-user" onClick={() => toggleModal()}>
            <img src={userImage} alt="user" />
          </div>
        </div>
      </div>
      <Modal />
    </>
  );
};
