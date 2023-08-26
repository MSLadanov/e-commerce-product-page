import React from 'react'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getToken } from "../../../redux/slices/userSlice";
import axios from "axios";

export const Orders = () => {
    const token = useSelector(getToken);
    const getOrdersInfo = async () => {
      const info = (await axios.get(`http://localhost:3001/api/basket/`,{
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }))
        .data as any;
    };
    useEffect(() => {
      getOrdersInfo();
    }, []);
    if(token === null){
        return (
            <div><h1>You must be signed for see link.</h1></div>
          )
    }
  return (
    <div>Orders</div>
  )
}
