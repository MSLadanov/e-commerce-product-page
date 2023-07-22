import React from 'react'
import { useSelector } from "react-redux";
import { getToken } from "../../../redux/slices/userSlice";

export const SignedDropdown = () => {
  const token = useSelector(getToken);
  return (
    <div>{token}</div>
  )
}
