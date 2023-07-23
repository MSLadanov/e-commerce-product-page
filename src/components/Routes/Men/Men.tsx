import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { SneakerCard } from "../../SneakerCard/SneakerCard";

function Men() {
  const [data, setData] = useState([]);
  const getSneakers = async () => {
    const sneakers = (await axios.get("http://localhost:3001/api/sneaker/"))
      .data as never;
    setData(sneakers);
  };
  useEffect(() => {
    getSneakers();
  }, []);
  if (!data.length) {
    return <div>No data!</div>;
  }
  return (
    <div>
      {data.map((item, index) => 
        <SneakerCard sneaker={item} key={index}/>
      )}
    </div>
  );
}

export default Men;
