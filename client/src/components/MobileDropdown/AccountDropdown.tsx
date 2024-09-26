import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getToken } from "../../redux/slices/userSlice";
import { getUserData } from "../../redux/slices/userSlice";
import { fetchData } from "../../redux/slices/userSlice";
import { SignedDropdown } from "../Dropdown/SignedDropdown";
import { UnsignedDropdown } from "../Dropdown/UnsignedDropdown";
import axios from "axios";

export const AccountDropdown = () => {
  const token = useSelector(getToken);
  const userData = useSelector(getUserData);
  const dispatch = useDispatch();
  const [userImage, setUserImage] = useState("/images/image-user.png");
  async function getUserInfo() {
    try {
      const res = await axios.get("http://localhost:3001/api/user/info/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(fetchData(res.data));
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if (token === null) {
      getUserInfo();
    }
  }, [token]);

  useEffect(() => {
    if (userData !== null) {
      setUserImage(`http://localhost:3001/${userData.img}`);
    }
  }, [userData]);
  if (token !== null && userData !== null) {
    return (
      <div className="dropdown active">
        <SignedDropdown userImage={userImage} setUserImage={setUserImage} />
      </div>
    );
  } else {
    return (
      <div className="dropdown active">
        <UnsignedDropdown />
      </div>
    );
  }
};
