import React from 'react'
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getUserData } from "../../../redux/slices/userSlice";
import axios from "axios";
import { OrderDetails } from './OrderDetails';

interface Order {
  address: string,
  createdAt: string,
  data: string,
  id: number,
  status: string,
  sum: string,
  updatedAt: string,
  userId: number
}

export const Orders = () => {
    const { token } = useSelector(getUserData);
    const [orders, setOrders] = useState<Order[]>([]);
    const getOrdersInfo = async () => {
      try {
        const info = (await axios.get(`http://localhost:3001/api/basket/`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }))
          .data;
          setOrders([...info.baskets])
      } catch (error) {
        console.log(error)
      }
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
      {orders.filter((item : Order) => item.status !== 'current').map((item : Order) => {
        return (
          <OrderDetails order={item} key={item.id}/>
        );
    })}
    </div>
  )
}
