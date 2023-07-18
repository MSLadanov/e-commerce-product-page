import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";

function Men() {
  const [data, setData] = useState([])
  // const getSneakers = async () => {
  //   const sneakers = (await axios.get('http://localhost:3001/api/sneaker/')).data as never
  //   setData([sneakers])
  // }
  // useEffect(() => {
  //   getSneakers()
  // }, [])
  if(!data.length){
    return <div>No data!</div>
  }
  return <div>{JSON.stringify(data)}</div>;
}

export default Men;
