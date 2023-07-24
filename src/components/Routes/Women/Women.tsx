import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { SneakerCard } from "../../SneakerCard/SneakerCard";

function Women() {
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
    <div className="cards">
      {data
        .filter((item: any) => item.sex === "WOMEN")
        .map((item, index) => (
          <SneakerCard sneaker={item} key={index} />
        ))}
    </div>
  );
}

export default Women;
