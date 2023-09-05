import React from 'react'
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getToken } from "../../../redux/slices/userSlice";
import axios from "axios";
import { OrderDetails } from './OrderDetails';

export const Orders = () => {
    const token = useSelector(getToken);
    const [orders, setOrders] = useState<any>([]);
    const getOrdersInfo = async () => {
      const info = (await axios.get(`http://localhost:3001/api/basket/`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }))
        .data as any;
        setOrders([...info.baskets])
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
      {/* {JSON.stringify(orders[0])} */}
      {orders.filter((item : any) => item.status !== 'current').map((item : any) => {
        return (
          <OrderDetails order={item} key={item.id}/>
        );
    })}
    </div>
  )
}
