import { useState, useEffect } from "react"

interface Sneaker {
    sex: string;
    name: string;
    brand: string;
    price: number;
    discount: number;
  }
  
function useSorting(initialData : [], sortingType : string){
    const [sortedData, setSortedData] = useState(initialData)
    useEffect(() => {
        switch (sortingType) {
            case "price_up":
              sortedData.sort((a: Sneaker, b: Sneaker) => b.price - a.price);
              break;
            case "discount_up":
              sortedData.sort((a: Sneaker, b: Sneaker) => b.discount - a.discount);
              break;
            case "discount_down":
              sortedData.sort((a: Sneaker, b: Sneaker) => a.discount - b.discount);
              break;
            case "price_down":
              sortedData.sort((a: Sneaker, b: Sneaker) => a.price - b.price);
              break;
          }
    }, [sortingType])
    return { sortedData }
}

export default useSorting