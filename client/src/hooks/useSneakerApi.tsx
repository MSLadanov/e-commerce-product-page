import { useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:3001/api";

interface Sneaker {
    sex: string
    name: string,
    brand: string,
    price: number,
    discount: number
  }

function useSneakerApi(){
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    async function getSneakers(param : 'Men' | 'Women') {
        try {
            const response = await axios.get(`${BASE_URL}/sneaker`);
            console.log(response.data.filter((item: Sneaker) => item.sex === param));
          } catch (error) {
            console.error('Fetch error:', error);
            throw error; 
          }
    }
    return { getSneakers }
}

export default useSneakerApi