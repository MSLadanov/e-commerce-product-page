import React, { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux';
import { getToken } from "../../../redux/slices/userSlice";
import axios from 'axios';

export const AllOrdersDetails = ({order} :any) => {
  const ref = useRef(document.createElement("div"));
  const statusHandlerRef = useRef(document.createElement('div'))
  const [showStatusHandler, setShowStatusHandler] = useState(false)
  const [userInfo, setUserInfo] = useState({
    name: "",
    surname: "",
    email: "",
    img: "",
  });
  const token = useSelector(getToken);
  const getFormattedDate = (date: any) => {
    const formattedDate = date.split("T");
    const datePart = formattedDate[0].match(/\d+/g),
      year = datePart[0].substring(2),
      month = datePart[1],
      day = datePart[2];
    return day + "." + month + "." + year;
  };
  const convertArray = (arr: any) => {
    const convertedArray = JSON.parse(arr.replace("/"));
    return convertedArray;
  };
  const deleteOrder = async (id: any) => {
    const response = await axios({
      method: "delete",
      url: `http://localhost:3001/api/basket/delete/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  };
  const getUserInfo = async (id: any) => {
    const response = await axios({
      method: "get",
      url: `http://localhost:3001/api/user/info/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => setUserInfo({ ...res.data }))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getUserInfo(order.userId);
  }, []);

  const openDetailsDropdown = () => {
    if(ref.current.style.height !== '0px'){
      ref.current.style.height = '0px'
    } else {
      ref.current.style.height = ref.current.scrollHeight + 'px'
    }
  };

  return (
    <>
      <div className="all-orders-card" >
        {" "}
        <img className='arrow' src="/images/icon-next.svg" alt="" onClick={() => openDetailsDropdown()} />
        <p>{order.id}</p>
        <p>{order.data.brand}</p>
        <div className="all-orders-card-data">
          <p>{userInfo.name + " " + userInfo.surname}</p>
          <p>{userInfo.email}</p>
        </div>
        <p>{order.address}</p>
        <p>{order.sum}</p>
        <p ref={statusHandlerRef}>{order.status}</p>
        <p>{getFormattedDate(order.updatedAt)}</p>
        <div className="cancel-order-btn">
          <img
            src="/images/icon-delete.svg"
            alt="delete"
            title="Delete order"
            onClick={() => deleteOrder(order.id)}
          />
        </div>
      </div>
      <div className="all-orders-details-container" ref={ref}>
        {convertArray(order.data).map((item: any, index: any) => {
          return (
            <div className="all-orders-cart-data-details" key={index}>
              <img src={`http://localhost:3001/${item.img}`} alt="" />
              <p>{item.brand}</p>
              <p>{item.name}</p>
              <p>{item.size}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}
