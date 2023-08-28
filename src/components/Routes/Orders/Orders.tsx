import React from 'react'
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getToken } from "../../../redux/slices/userSlice";
import axios from "axios";

export const Orders = () => {
    const token = useSelector(getToken);
    const [orders, setOrders] = useState<any>([]);
    const getOrdersInfo = async () => {
      const info = (await axios.get(`http://localhost:3001/api/basket/`,{
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }))
        .data as any;
        setOrders([...info.baskets])
        console.log({orders})
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
      {orders.map((item : any) => {
        return (
          <div>
            <p>{item.id}</p>
            <p>{item.data}</p>
            <p>{item.status}</p>
            <p>{item.createdAt}</p>
            <p>{item.updatedAt}</p>
          </div>
        );
    })}
    </div>
  )
}
