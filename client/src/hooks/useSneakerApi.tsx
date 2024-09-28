import { useState } from "react";
const BASE_URL = "http://localhost:3001/api";

function useSneakerApi(){
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    async function getSneakers() {
        
    }
    return { getSneakers }
}

export default useSneakerApi