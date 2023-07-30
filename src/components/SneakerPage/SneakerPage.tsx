import React from "react";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ErrorPage from "../Routes/Error/Error";
import "./style.scss";

export const SneakerPage = () => {
  let { id, sex } = useParams();
  const btnDropDownRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLInputElement>(null);
  const [isActive, setIsActive] = useState(false);
  const onClick = (e:any) => {
    setIsActive(!isActive)
  };
  const [sneakerInfo, setSneakerInfo] = useState({
    name: null,
    brand: null,
    description: null,
    price: null,
    discount: null,
    mainImage: null,
    img1: null,
    img2: null,
    img3: null,
    img4: null,
    sizes: [],
  });
  const getSneakerInfo = async () => {
    const info = (await axios.get(`http://localhost:3001/api/sneaker/${id}`))
      .data as any;
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
    window.onclick = (event: any) => {
      if(event.target !== btnDropDownRef.current){
        if (
          !dropdownRef.current?.contains(event.target) &&
          !dropdownRef.current?.contains(event.target) 
        ) {
          console.log('close')
          setIsActive(false)
        } 
      }
    };
  }, []);
  const changeMainImage = (e: any) => {
    setSneakerInfo((prev) => ({
      ...prev,
      mainImage: e.target.src.split("/")[3],
    }));
  };

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
            <div className="discount">
              <h4>{sneakerInfo.discount} %</h4>
            </div>
          </div>

          <div className="size-dropdown">
             {/* dropdown */}
             <div className="dropdown__container">
              {/* Dropdown Button */}
              <button className="dropdown__btn" ref={btnDropDownRef} onClick={(e) => onClick(e)}>
                Add to cart
              </button>

              {/* Dropdown Content */}
              <div
                ref={dropdownRef}
                className={`dropdown__content ${
                  isActive ? "open" : "close"
                }`}
              >
                <div className="dropdown__info">
                  <ul>
                    <li>
                      <span>Settings</span>
                    </li>
                    <li>
                      <span>Purchases</span>
                    </li>
                    <li>
                      <span>Upgrade</span>
                    </li>
                  </ul>
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

// {sneakerInfo.sizes.map<React.ReactNode>((item, index) => {
//   return <div className="size-box" key={index}>{item}</div>;
// })}