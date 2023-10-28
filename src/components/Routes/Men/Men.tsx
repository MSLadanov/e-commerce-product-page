import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { SneakerCard } from "../../SneakerCard/SneakerCard";
import { useDispatch, useSelector } from "react-redux";
import { getSortData } from "../../../redux/slices/sortSlice";
import { getSearchData } from "../../../redux/slices/searchSlice";
import "./style.scss";

export default function Men() {
  const [data, setData] = useState([]);
  const sort = useSelector(getSortData);
  const search = useSelector(getSearchData);
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
  if (sort.length !== 0 && search.length === 0) {
    console.log("Sorting...");
    switch (sort) {
      case "price_up":
        console.log("price_up");
        return (
          <div className="cards">
            {data
              .filter((item: any) => item.sex === "MEN")
              .sort((a:any,b:any) => b.price - a.price)
              .map((item, index) => (
                <SneakerCard sneaker={item} key={index} />
              ))}
          </div>
        );
      case "discount_up":
        return (
          <div className="cards">
            {data
              .filter((item: any) => item.sex === "MEN")
              .sort((a:any,b:any) => b.discount - a.discount)
              .map((item, index) => (
                <SneakerCard sneaker={item} key={index} />
              ))}
          </div>
        );
      case "discount_down":
        return (
          <div className="cards">
            {data
              .filter((item: any) => item.sex === "MEN")
              .sort((a:any,b:any) => a.discount - b.discount)
              .map((item, index) => (
                <SneakerCard sneaker={item} key={index} />
              ))}
          </div>
        );
      case "price_down":
        return (
          <div className="cards">
            {data
              .filter((item: any) => item.sex === "MEN")
              .sort((a:any,b:any) => a.price - b.price)
              .map((item, index) => (
                <SneakerCard sneaker={item} key={index} />
              ))}
          </div>
        );
    }
    if (search.length !== 0 && sort.length === 0) {
      console.log("Searching...");
    }
    if (search.length !== 0 && sort.length !== 0) {
      console.log("Sorting and searching...");
    }
    if (search.length === 0 && sort.length === 0) {
      return (
        <div className="cards">
          {data
            .filter((item: any) => item.sex === "MEN")
            .map((item, index) => (
              <SneakerCard sneaker={item} key={index} />
            ))}
        </div>
      );
    }
  }
  return (
    <div className="cards">
      {data
        .filter((item: any) => item.sex === "MEN")
        .map((item, index) => (
          <SneakerCard sneaker={item} key={index} />
        ))}
    </div>
  );
}
