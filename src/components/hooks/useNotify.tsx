import { useDispatch } from "react-redux";
import { showNotify, hideNotify } from "../../redux/slices/notifySlice";

export default function useNotify () {
  return{
    // const dispatch = useDispatch();
    // dispatch(showNotify());
    // setTimeout(() => {
    //   dispatch(hideNotify());
    // }, 2000);
  }
 
}
