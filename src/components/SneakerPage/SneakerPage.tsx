import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export const SneakerPage = () => {
  let { id, sex } = useParams();
  const [sneakerInfo, setSneakerInfo] = useState({ name: null, brand: null, description:null, price:null });
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

  return (
    <div>
      <div className="image-box">
        <div className="main-image"></div>
        <div className="thumbnails"></div>
      </div>
      <div className="info-box">
        <h4>{sneakerInfo.brand}</h4>
        <h1>{sneakerInfo.name}</h1>
        <p>{sneakerInfo.description}</p>
        <h2>{sneakerInfo.price} $</h2>
      </div>
    </div>
  );
};
