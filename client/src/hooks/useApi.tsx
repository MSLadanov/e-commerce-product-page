import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { signIn } from "../redux/slices/userSlice";

const BASE_URL = "http://localhost:3001/api";

function useApi() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  async function login(data: {}) {
    try {
      const res = await axios.post(`${BASE_URL}/user/login/`, data);
      const token = res.data.token;
      const user =  await axios.get(`${BASE_URL}/user/info/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const userData = {...user.data, token}
      dispatch(signIn(userData))
    } catch (error) {
        console.log(error)
    }
  }

  async function register(data:{}) {
    try {
        const user = await axios.post(
        "http://localhost:3001/api/user/register/",
        data
      )
    } catch (error) {
        console.log(error)
    }
    
  }
  return { login, register };
}

export default useApi;
