import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserData, signIn } from "../../redux/slices/userSlice";
import { NavLink } from "react-router-dom";
import "./style.scss";
import useModal from "../../hooks/useModal";
import { userService } from "../../api/api";
import useUserApi from "../../hooks/useUserApi";
import Navbar from "../Navbar/Navbar";

export const Header = () => {
  const { toggleModal, handleModalType, handleOutSideClick, Modal } = useModal();
  const { login } = useUserApi()
  const userData = useSelector(getUserData);
  const { token } = useSelector(getUserData)
  const [userImage, setUserImage] = useState("/images/image-user.png");
  const dispatch = useDispatch();
  // useEffect(() => {
  //   if (token) {
  //     console.log(token, 'token')
  //     userService.getUser(token).then((res) => dispatch(signIn(res)));
  //   }
  // }, [userData]);

  useEffect(() => {
    if (token) {
      setUserImage(`http://localhost:3001/${userData.img}`);
    }
  }, [userData]);
  return (
    <>
      <nav>
        <Navbar />
        <div className="account-navbar">
          <div
            className="account-button-cart"
            onClick={(e) => {
              toggleModal();
              handleModalType('cart')
              handleOutSideClick(e)
            }}
          >
            <img src="/images/icon-cart.svg" alt="cart" />
          </div>
          <div className="account-button-user">
            <img
              onClick={(e) => {
                toggleModal();
                handleModalType('account')
                handleOutSideClick(e)
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
