import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { SneakerCard } from "../../SneakerCard/SneakerCard";
import { useDispatch, useSelector } from "react-redux";
import { getSortData } from "../../../redux/slices/sortSlice";
import { getSearchData } from "../../../redux/slices/searchSlice";
import "./style.scss";

function Men() {
  const [data, setData] = useState([]);
  const sort = useSelector(getSortData)
  const search = useSelector(getSearchData)
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
  if(sort.length !== 0 && search.length === 0){
    console.log('Sorting...')
  }
  if(search.length !== 0 && sort.length === 0){
      console.log('Searching...')
  }
  if(search.length !== 0 && sort.length !== 0){
    console.log('Sorting and searching...')
  }
  if(search.length === 0 && sort.length === 0){
    console.log('Do nothing...')
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

export default Men;
