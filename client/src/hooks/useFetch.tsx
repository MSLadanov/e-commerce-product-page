import { useState, useEffect } from "react";
import axios from "axios";

function useFetch(url: string) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('')
  async function fetchData (){
    setIsLoading(true)
    try {
        const res = await axios.get(url)
        setData(res.data)
    } catch (error) {
        setIsError(true)
        setErrorMessage('')
    } finally {
        setIsLoading(false)
    }
  }
  useEffect(() => {
    fetchData()
  },[])
  return { data, isLoading, isError, errorMessage }
}

export default useFetch;
