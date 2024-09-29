import { useState, useEffect } from "react";
import { SneakerCard } from "../../SneakerCard/SneakerCard";
import { SearchAndSort } from "../../SearchAndSort/SearchAndSort";
import { useSelector } from "react-redux";
import { getSortData } from "../../../redux/slices/sortSlice";
import { getSearchData } from "../../../redux/slices/searchSlice";
import { sneakerService } from "../../../api/api";
import useSneakerApi from "../../../hooks/useSneakerApi";
import useFetch from "../../../hooks/useFetch";
import useSorting from "../../../hooks/useSorting";
import "../Men/style.scss";

interface Sneaker {
  sex: string;
  name: string;
  brand: string;
  price: number;
  discount: number;
}

export default function Women() {
  const sort = useSelector(getSortData);
  const search = useSelector(getSearchData);
  const { data, isLoading, isError } = useFetch(
    "http://localhost:3001/api/sneaker"
  );
  const { sortedData } = useSorting(data.filter((item: Sneaker) => item.sex === "Women") , sort)
  const searchFunction = (a: Sneaker, b: Sneaker) => {
    if (
      a.name.toLowerCase().match(search.toLowerCase()) ||
      a.brand.toLowerCase().match(search.toLowerCase())
    ) {
      return -1;
    } else {
      return 0;
    }
  };
  useEffect(() => {
    if (search.length !== 0) {
      data.sort((a: Sneaker, b: Sneaker) => searchFunction(a, b));
    }
  }, [search]);

  if (!data.length) {
    return <div>No data!</div>;
  }
  return (
    <>
      <SearchAndSort />
      <div className="cards">
        {data
          .filter((item: Sneaker) => item.sex === "Women")
          .map((item, index) => (
            <SneakerCard sneaker={item} key={index} />
          ))}
      </div>
    </>
  );
}
