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
      .data as any;
    setData(sneakers.filter((item: any) => item.sex === "MEN"));
  };
  useEffect(() => {
    getSneakers();
  }, []);
  const gigaFilterFunction = () => {
    console.log('filter')
    if (search.length === 0 && sort.length === 0) {
      console.log("Do nothing...");
    }
    if (sort.length !== 0 && search.length === 0) {
    console.log("Sorting...");
    switch (sort) {
      case "price_up":
        data.sort((a:any,b:any) => b.price - a.price)
        break;
      case "discount_up":
        data.sort((a:any,b:any) => b.discount - a.discount)
        break;
      case "discount_down":
        data.sort((a:any,b:any) => a.discount - b.discount)
        break;
      case "price_down":
        data.sort((a:any,b:any) => a.price - b.price)
        break;
    }
  }
  if (search.length !== 0 && sort.length === 0) {
    console.log("Searching...");
    data.filter((item : any) => {
      if (search === '') {
          return item;
      }
      else {
          return item.name.toLowerCase().includes(search)
      }
  })
  }
  if (search.length !== 0 && sort.length !== 0) {
    console.log("Sorting and searching...");
  }
  }
  if (!data.length) {
    return <div>No data!</div>;
  }
  gigaFilterFunction()
  return (
    <div className="cards">
      {data.map((item, index) => (
          <SneakerCard sneaker={item} key={index} />
        ))}
    </div>
  );
}
