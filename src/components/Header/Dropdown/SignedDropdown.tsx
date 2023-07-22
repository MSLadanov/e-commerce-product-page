import React from 'react'
import { useSelector } from "react-redux";
import { getUserData } from "../../../redux/slices/userSlice";

export const SignedDropdown = () => {
  const userData = useSelector(getUserData);
  return (
    <div>{JSON.stringify(userData)}</div>
  )
}
