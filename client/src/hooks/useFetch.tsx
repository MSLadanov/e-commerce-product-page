import { useState, useEffect } from "react";
import axios from "axios";

function useFetch(url: string) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
}

export default useFetch;
