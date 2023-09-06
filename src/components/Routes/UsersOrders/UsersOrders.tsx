import React from 'react'
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getToken } from "../../../redux/slices/userSlice";
import axios from "axios";
import './style.scss'
import { AllOrdersDetails } from './AllOrdersDetails';

export const UsersOrders = () => {
    const token = useSelector(getToken);
    const [orders, setOrders] = useState<any>([]);
    const getOrdersInfo = async () => {
      const info = (await axios.get(`http://localhost:3001/api/basket/all`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }))
        .data as any;
        setOrders([...info])
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
    <div>
      {orders.filter((item : any) => item.status !== 'current').map((item : any) => {
        return (
          <AllOrdersDetails order={item} key={item.id}/>
        );
    })}
    </div>
  )
}
