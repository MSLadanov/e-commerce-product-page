import { useState, useEffect } from "react";

interface Sneaker {
  sex: string;
  name: string;
  brand: string;
  price: number;
  discount: number;
}

function useSorting(initialData: Sneaker[] | never[], sortingType: string) {
  const [sortedData, setSortedData] = useState(initialData);
  useEffect(() => {
    console.log(initialData)
    console.log(sortingType)
    switch (sortingType) {
      case "price_up":
        setSortedData(
          sortedData.sort((a: Sneaker, b: Sneaker) => b.price - a.price)
        );
        break;
      case "discount_up":
        setSortedData(
          sortedData.sort((a: Sneaker, b: Sneaker) => b.discount - a.discount)
        );
        break;
      case "discount_down":
        setSortedData(
          sortedData.sort((a: Sneaker, b: Sneaker) => a.discount - b.discount)
        );
        break;
      case "price_down":
        setSortedData(
          sortedData.sort((a: Sneaker, b: Sneaker) => a.price - b.price)
        );
        break;
      default:
        setSortedData(initialData);
    }
    console.log(sortedData)
  }, [initialData, sortingType]);
  return { sortedData };
}

export default useSorting;
