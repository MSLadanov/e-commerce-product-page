import React from "react";
import { useSelector } from "react-redux";
import { getUserData } from "../../redux/slices/userSlice";
import { signOut } from "../../redux/slices/userSlice";
import { useDispatch } from "react-redux";
import './style.scss'

interface SignedDropdownProps{
  userImage: string,
}

export const SignedDropdown = ({ userImage }: SignedDropdownProps) => {
  const userData = useSelector(getUserData);
  const dispatch = useDispatch()
  return (
    <div className="user-panel">
      <img
        className="user-image"
        src={userImage}
        alt="user"
      />
      {userData && <h1>{userData.name + ' ' + userData.surname}</h1>}
      <button onClick={() => {
           dispatch(signOut())
      }}>Sign Out</button>
    </div>
  );
};
