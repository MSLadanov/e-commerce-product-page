import React from 'react'
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getToken } from "../../../redux/slices/userSlice";
import axios from "axios";
import './style.scss'
import { AllOrdersDetails } from './AllOrdersDetails';

interface Order {
  id: string,
  data: string,
  status: string,
  address: string,
  sum: string 
}

export const UsersOrders = () => {
    const token = useSelector(getToken);
    const [orders, setOrders] = useState<[] | Order[]>([]);
    const [accessError, setAccessError] = useState<null | string>(null)
    const getOrdersInfo = async () => {
      const info = (await axios.get(`http://localhost:3001/api/basket/all`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        setOrders([...res.data])
      }).catch((err) => {
        setAccessError(`${err.response.status} ${err.response.data.message}`)
      }))
    };
  

    useEffect(() => {
      getOrdersInfo();
    }, []);
    if(token === null){
        return (
            <div><h1>You must be signed for see link.</h1></div>
          )
    }
    if(accessError){
      return (
        <div><h1>{accessError}</h1></div>
      )
    }
  return (
    <div className='all-orders-card-container'>
      {orders.filter((item : Order) => item.status !== 'current').map((item : Order) => {
        return (
          <AllOrdersDetails order={item} key={item.id}/>
        );
    })}
    </div>
  )
}
