import React from 'react'
import { useSelector } from 'react-redux';
import { getToken } from "../../../redux/slices/userSlice";

export const Orders = () => {
    const token = useSelector(getToken);
    if(token === null){
        return (
            <div><h1>You must be signed for see link.</h1></div>
          )
    }
  return (
    <div>Orders</div>
  )
}
