import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserData, signIn } from "../../redux/slices/userSlice";
import { NavLink } from "react-router-dom";
import "./style.scss";
import useModal from "../../hooks/useModal";
import { userService } from "../../api/api";

export const Header = () => {
  const { toggleModal, handleModalType, Modal } = useModal();
  const userData = useSelector(getUserData);
  const { token } = useSelector(getUserData)
  const [userImage, setUserImage] = useState("/images/image-user.png");
  const dispatch = useDispatch();
  useEffect(() => {
    if (token !== null) {
      userService.getUser(token).then((res) => dispatch(signIn(res)));
    }
  }, [userData]);

  useEffect(() => {
    if (userData !== null) {
      setUserImage(`http://localhost:3001/${userData.img}`);
    }
  }, [userData]);
  return (
    <>
      <nav>
        <div className="site-navbar">
          <div className="logo">
            <img src="/images/logo.svg" alt="logo" />
          </div>
          <NavLink to="men/">Men</NavLink>
          <NavLink to="women/">Women</NavLink>
          {userData !== null && <NavLink to="orders/">My Orders</NavLink>}
          <NavLink to="about/">About</NavLink>
          <NavLink to="contact/">Contact</NavLink>
        </div>
        <div className="account-navbar">
          <div
            className="account-button-cart"
            onClick={() => {
              handleModalType("cart");
              toggleModal();
            }}
          >
            <img src="/images/icon-cart.svg" alt="cart" />
          </div>
          <div className="account-button-user">
            <img
              onClick={() => {
                handleModalType("account");
                toggleModal();
              }}
              src={userImage}
              alt="user"
            />
          </div>
        </div>
        <Modal />
      </nav>
    </>
  );
};
