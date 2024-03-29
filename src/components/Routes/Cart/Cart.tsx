import React, { useState } from 'react'
import axios from "axios";
import { useSelector } from "react-redux";
import { getCartData } from "../../../redux/slices/cartSlice";
import { removeSneaker } from "../../../redux/slices/cartSlice";
import { useDispatch } from "react-redux";
import { getToken } from "../../../redux/slices/userSlice";
import useNotify from '../../hooks/useNotify';
import "./style.scss";

export const Cart = () => {
  const [toggleNotify] = useNotify()
  const [address, setAddress] = useState('')
  const cartData = useSelector(getCartData);
  const dispatch = useDispatch();
  const token = useSelector(getToken);
  const makeOrder = () => {
    const orderData: any[] = []
    cartData.map((item : any) => {orderData.push({
      id: item.id,
      name: item.name,
      brand: item.brand,
      size: item.size,
      price: item.price,
      img: item.img
    });})
    let sum = cartData.reduce(function (acc : any, obj : any) { return acc + obj.price; }, 0);
    const orderDetails = {
        order:orderData,
        address,
        sum
      }
    const order = axios.post(
      "http://localhost:3001/api/basket/send",
      orderDetails,
      {
        headers: {
          Authorization: `Bearer ${token}`
        },
      }
    ).then((res) => toggleNotify(res.data.message)).catch((err) => {toggleNotify(err.response.data.message)});
  }
  if (!cartData.length) {
    return (
      <>
        <h1>Cart</h1>
        <h2>Your cart is empty</h2>
      </>
    );
  }
  return (
    <div>
      {cartData.map((item: any) => (
        <div className="cart-item" key={item.cart_id}>
          <img src={`http://localhost:3001/${item.img}`} alt="" />
          <p>{item.brand + " " + item.name + ", " + " Size: " + item.size}</p>
          <p>{item.price + " " + "$"}</p>
          <img
            className="delete-icon"
            onClick={() => dispatch(removeSneaker(item.cart_id))}
            src="/images/icon-delete.svg"
            alt="cart"
          />
        </div>
      ))}
      {token !== null ? (
        <div>
          <input type="text" placeholder='Input your address' onChange={(e) => setAddress(e.target.value)} />
          <button className="cart-btn" onClick={() => makeOrder()}>
            Make order
          </button>
        </div>
      ) : (
        <div className="center">
          <h1>You must be logged in to complete your order!</h1>
        </div>
      )}
    </div>
  );
}
