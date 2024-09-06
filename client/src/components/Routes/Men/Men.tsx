import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { SneakerCard } from "../../SneakerCard/SneakerCard";
import { SearchAndSort } from "../../SearchAndSort/SearchAndSort";
import { useSelector } from "react-redux";
import { getSortData } from "../../../redux/slices/sortSlice";
import { getSearchData } from "../../../redux/slices/searchSlice";
import "./style.scss";

interface Sneaker {
  sex: string
  name: string,
  brand: string,
  price: number,
  discount: number
}

export default function Men() {
  const [data, setData] = useState([]);
  const [initialData, setInitialData] = useState([])
  const sort = useSelector(getSortData);
  const search = useSelector(getSearchData);
  const getSneakers = async () => {
    const sneakers = (await axios.get("http://localhost:3001/api/sneaker/"))
      .data as any;
    setData(sneakers.filter((item: Sneaker) => item.sex === "MEN"));
    setInitialData(sneakers.filter((item: Sneaker) => item.sex === "MEN"))
  };
  const searchFunction = (a : Sneaker,b : Sneaker)  => {
    if (a.name.toLowerCase().match(search.taoLowerCase()) || a.brand.toLowerCase().match(search.toLowerCase())){
      return -1
    } else {
      return 0
    }
  }
  useEffect(() => {
    getSneakers();
  }, []);
  useEffect(() => {
    if(search.length !== 0){
      data.sort((a:Sneaker,b:Sneaker) => searchFunction(a,b))
    }
    if(search.length === 0){
      setData(initialData)
      if(sort.length !== 0){
        gigaSortFunction()
      }
    }
  }, [search])
  useEffect(() => {
   gigaSortFunction()
  }, [sort])
  
  const gigaSortFunction = () => {
    switch (sort) {
      case "price_up":
        data.sort((a:Sneaker,b:Sneaker) => b.price - a.price)
        break;
      case "discount_up":
        data.sort((a:Sneaker,b:Sneaker) => b.discount - a.discount)
        break;
      case "discount_down":
        data.sort((a:Sneaker,b:Sneaker) => a.discount - b.discount)
        break;
      case "price_down":
        data.sort((a:Sneaker,b:Sneaker) => a.price - b.price)
        break;
    }
  }
  if (!data.length) {
    return <div>No data!</div>;
  }
  return (
    <>
      <SearchAndSort />
      <div className="cards">
        {data.map((item, index) => (
          <SneakerCard sneaker={item} key={index} />
        ))}
      </div>
    </>
  );
}
