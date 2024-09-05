import React from 'react'
import { useSelector } from 'react-redux';
import { getToken } from "../../../redux/slices/userSlice";
import axios from 'axios';
import './style.scss'

export const OrderDetails = ({order} : any) => {
  const token = useSelector(getToken);
    const getFormattedDate = (date : any) => {
        const formattedDate = date.split('T')
        const datePart = formattedDate[0].match(/\d+/g),
        year = datePart[0].substring(2),
        month = datePart[1], day = datePart[2];
        return day + "." + month + "." + year;
      }
      const convertArray = (arr:any) => {
        const convertedArray = JSON.parse(arr.replace('/'))
        return convertedArray
      }
      const cancelOrder = async (id : any) => {
      await axios({
        method: "post",
        url: `http://localhost:3001/api/basket/cancel/${id}`,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });
      }
  return (
    <div className="order-card">
      {" "}
      <p>{order.id}</p>
      <p>{order.data.brand}</p>
      <div className="order-card-data">
        {convertArray(order.data).map((item: any, index : any) => {
          return (
            <div className='order-cart-data-details' key={index}>
              <img src={`http://localhost:3001/${item.img}`} alt="" />
              <p>{item.brand}</p>
              <p>{item.name}</p>
              <p>{item.size}</p>
            </div>
          );
        })}
      </div>
      <p>{order.address}</p>
      <p>{order.sum}</p>
      <p>{order.status}</p>
      <p>{getFormattedDate(order.updatedAt)}</p>
      <div className='cancel-order-btn'>
      <img
            src="/images/icon-delete.svg"
            alt="delete"
            title='Cancel order'
            onClick={() => cancelOrder(order.id)}
          />
      </div>
    </div>
  );
}
