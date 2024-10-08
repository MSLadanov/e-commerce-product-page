import React, { JSXElementConstructor } from "react";
import { useState, useEffect, useRef } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import axios from "axios";
import { addSneaker } from "../../redux/slices/cartSlice";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import useNotify from '../../hooks/useNotify';
import "./style.scss";

interface ISneakerInfo {
    id: null | string,
    name: null | string,
    brand: null | string,
    description: null | string,
    price: null | string,
    discount: number,
    mainImage: null | string,
    img1: null | string,
    img2: null | string,
    img3: null | string,
    img4: null | string,
    sizes: string[],
}

export const SneakerPage = () => {
  const dispatch = useDispatch();
  const [
    setOpenDropdown,
    setOpenCartDropdown,
  ]: [(state: boolean) => void, (state: boolean) => void] = useOutletContext();
  let { id, sex } = useParams();
  const btnDropDownRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLInputElement>(null);
  const [isActive, setIsActive] = useState(false);
  const onClick = (e: React.MouseEvent) => {
    setIsActive(!isActive);
  };
  const [toggleNotify]= useNotify();
  const [sneakerInfo, setSneakerInfo] = useState<ISneakerInfo>({
    id: null,
    name: null,
    brand: null,
    description: null,
    price: null,
    discount: 0,
    mainImage: null,
    img1: null,
    img2: null,
    img3: null,
    img4: null,
    sizes: [],
  });
  const getSneakerInfo = async () => {
    const info = (await axios.get(`http://localhost:3001/api/sneaker/${id}`))
      .data;
    if (info.sex.toLowerCase() === sex) {
      setSneakerInfo(info);
    }
  };
  useEffect(() => {
    getSneakerInfo();
  }, []);
  useEffect(() => {
    setSneakerInfo((prev) => ({
      ...prev,
      mainImage: sneakerInfo.img1,
    }));
  }, [sneakerInfo.img1]);
  useEffect(() => {
    window.onclick = (event: MouseEvent) => {
        if (event.target !== btnDropDownRef.current) {
            if (
                !dropdownRef.current?.contains(event.target as Node) &&
                !dropdownRef.current?.contains(event.target as Node)
            ) {
                setIsActive(false);
                if (
                    !event
                        .composedPath()
                        .find((item: EventTarget) => (item as HTMLElement).className === "dropdown active") &&
                    !event
                        .composedPath()
                        .find((item: EventTarget) => (item as HTMLElement).className === "account-button-user")
                ) {
                    setOpenDropdown(false);
                    setOpenCartDropdown(false);
                }
                if (
                    !event
                        .composedPath()
                        .find((item: EventTarget) => (item as HTMLElement).className === "cart-dropdown active") &&
                    !event
                        .composedPath()
                        .find((item: EventTarget) => (item as HTMLElement).className === "account-button-cart")
                ) {
                    console.log('close dropdown');
                    setOpenCartDropdown(false);
                } else {
                    setOpenCartDropdown(true);
                }
            }
        }
    };
}, []);

const changeMainImage = (e: React.MouseEvent<HTMLImageElement>) => {
  if (e.currentTarget.src) {
    setSneakerInfo((prev) => ({
      ...prev,
      mainImage: e.currentTarget.src.split("/")[3],
    }));
  }
};

  const addToCart = (size : string) => {
    const sneaker = {
      id: sneakerInfo.id,
      cart_id: uuidv4(),
      name: sneakerInfo.name,
      brand: sneakerInfo.brand,
      price: sneakerInfo.price,
      img: sneakerInfo.img1,
      size
    }
    dispatch(addSneaker(sneaker));
    toggleNotify('Товар добавлен в корзину!')
  }

  if (sneakerInfo.name !== null) {
    return (
      <div className="sneaker-page">
        <div className="image-box">
          <div className="main-image">
            <img
              src={
                sneakerInfo.mainImage
                  ? `http://localhost:3001/${sneakerInfo.mainImage}`
                  : `http://localhost:3001/${sneakerInfo.img1}`
              }
              alt={`img1`}
            />
          </div>
          <div className="thumbnails">
            <div className="thumbnail">
              <img
                onClick={(e) => changeMainImage(e)}
                src={`http://localhost:3001/${sneakerInfo.img1}`}
                alt={`img1`}
              />
            </div>
            <div className="thumbnail">
              <img
                onClick={(e) => changeMainImage(e)}
                src={`http://localhost:3001/${sneakerInfo.img2}`}
                alt={`img1`}
              />
            </div>
            <div className="thumbnail">
              <img
                onClick={(e) => changeMainImage(e)}
                src={`http://localhost:3001/${sneakerInfo.img3}`}
                alt={`img1`}
              />
            </div>
            <div className="thumbnail">
              <img
                onClick={(e) => changeMainImage(e)}
                src={`http://localhost:3001/${sneakerInfo.img4}`}
                alt={`img1`}
              />
            </div>
          </div>
        </div>
        <div className="info-box">
          <h4>{sneakerInfo.brand}</h4>
          <h1>{sneakerInfo.name}</h1>
          <p>{sneakerInfo.description}</p>
          <div className="price-box">
            <div className="price">
              <h2>{sneakerInfo.price} $</h2>
            </div>
            <div className={sneakerInfo.discount > 0 ? 'discount' : 'discount zero-discount'}>
              <h4>{sneakerInfo.discount} %</h4>
            </div>
          </div>

          <div className="size-dropdown">
            {/* dropdown */}
            <div className="dropdown__container">
              {/* Dropdown Button */}
              <button
                className="dropdown__btn"
                ref={btnDropDownRef}
                onClick={(e) => onClick(e)}
              >
                Add to cart
              </button>

              {/* Dropdown Content */}
              <div
                ref={dropdownRef}
                className={`dropdown__content ${isActive ? "open" : "close"}`}
              >
                <div className="dropdown__info">
                  <h3>Available sizes:</h3>
                  <div className="sizes-box">
                    {sneakerInfo.sizes.map((item, index) => {
                      return (
                        <div className="size-box" key={index} onClick={() => addToCart(item)}>
                          {item}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            {/* dropdown */}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Not Found!</h1>
      </div>
    );
  }
};
