import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ErrorPage from "../Routes/Error/Error";
import "./style.scss";

export const SneakerPage = () => {
  let { id, sex } = useParams();
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

  const changeMainImage = (e: any) => {
    setSneakerInfo((prev) => ({
      ...prev,
      mainImage: e.target.src.split("/")[3],
    }));
    console.log(sneakerInfo.img1);
    console.log(sneakerInfo.mainImage);
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
          <div className="sizes-box"></div>
          <div className="size-dropdown">
            <button>Add to cart</button>
            <div className="size-dropdown-content">
              {sneakerInfo.sizes.map<React.ReactNode>((item) => {
                return <div className="size-box">{item}</div>;
              })}
            </div>
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
