import { useDispatch } from "react-redux";
import { showNotify, hideNotify } from "../../redux/slices/notifySlice";

export default function useNotify () {
  const dispatch = useDispatch();
  function toggleNotify (){
    dispatch(showNotify());
    setTimeout(() => {
      dispatch(hideNotify());
    }, 2000);
  }
  return [toggleNotify]
  }
 

