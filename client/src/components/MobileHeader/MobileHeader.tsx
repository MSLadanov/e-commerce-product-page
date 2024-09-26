import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getUserData } from "../../redux/slices/userSlice";

export const MobileHeader = () => {
  const userData = useSelector(getUserData);
  const [userImage, setUserImage] = useState("/images/image-user.png");
  useEffect(() => {
    if (userData !== null) {
      setUserImage(`http://localhost:3001/${userData.img}`);
    }
  }, [userData]);
  return (
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
        <div className="mobile-account-button-user">
          <img src={userImage} alt="user" />
        </div>
      </div>
    </div>
  );
};
