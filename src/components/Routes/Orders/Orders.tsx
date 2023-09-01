import React from 'react'
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getToken } from "../../../redux/slices/userSlice";
import axios from "axios";

export const Orders = () => {
    const token = useSelector(getToken);
    const [orders, setOrders] = useState<any>([]);
    const getFormattedDate = (date : any) => {
      const formattedDate = date.split('T')
      const datePart = formattedDate[0].match(/\d+/g),
      year = datePart[0].substring(2),
      month = datePart[1], day = datePart[2];
      return day + "." + month + "." + year;
    }
    const getOrdersInfo = async () => {
      const info = (await axios.get(`http://localhost:3001/api/basket/`,{
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
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
          <div key={item.id}>
            <p>{item.id}</p>
            <p>{item.data}</p>
            <p>{item.status}</p>
            <p>{getFormattedDate(item.updatedAt)}</p>
            <p>{item.updatedAt}</p>
          </div>
        );
    })}
    </div>
  )
}
