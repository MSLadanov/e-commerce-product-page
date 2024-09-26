import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { signIn } from "../redux/slices/userSlice";

const BASE_URL = "http://localhost:3001/api";

function useApi() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  async function getUserByToken(data: {}) {
    try {
      const res = await axios.post(`${BASE_URL}/user/login/`, data);
      const token = res.data.token;
      const user =  await getUserData(token)
      const userData = {...user, token}
      console.log(userData)
      dispatch(signIn(userData))
    } catch (error) {}
  }
  async function getUserData(token: string) {
    try {
      const user = await axios.get(`${BASE_URL}/user/info/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return user.data
    } catch (error) {
      console.log(error);
    }
  }
  return { getUserByToken, getUserData };
}

export default useApi;
