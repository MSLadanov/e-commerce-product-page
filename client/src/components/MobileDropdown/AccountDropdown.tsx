import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserData } from "../../redux/slices/userSlice";
import { signIn } from "../../redux/slices/userSlice";
import { SignedDropdown } from "../Dropdown/SignedDropdown";
import { UnsignedDropdown } from "../Dropdown/UnsignedDropdown";
import { userService } from "../../api/api";

export const AccountDropdown = () => {
  const userData = useSelector(getUserData);
  const { token } = useSelector(getUserData)
  const dispatch = useDispatch();
  const [userImage, setUserImage] = useState("/images/image-user.png");
  useEffect(() => {
    if (token !== null) {
      userService.getUser(token)
    }
  }, [userData]);

  useEffect(() => {
    if (userData !== null) {
      setUserImage(`http://localhost:3001/${userData.img}`);
    }
  }, [userData]);
  if (userData.token !== null && userData !== null) {
    return (
      <div className="dropdown active">
        <SignedDropdown userImage={userImage} />
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
