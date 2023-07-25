import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export const SneakerPage = () => {
  let { id, sex } = useParams();
  console.log(sex)
  const [sneakerInfo, setSneakerInfo] = useState(null);
  const getSneakerInfo = async () => {
    const info = (await axios.get(`http://localhost:3001/api/sneaker/${id}`))
      .data as any;
      if(info.sex.toLowerCase() === sex){
        setSneakerInfo(info);
      }
  };
  useEffect(() => {
    getSneakerInfo();
  }, []);

  return <div>{JSON.stringify(sneakerInfo)}</div>;
};
