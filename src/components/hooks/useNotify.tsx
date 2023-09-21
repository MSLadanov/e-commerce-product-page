import { useDispatch } from "react-redux";
import { showNotify, hideNotify, changeText, removeText } from "../../redux/slices/notifySlice";

export default function useNotify () {
  const dispatch = useDispatch();
  function toggleNotify (message: any){
    dispatch(changeText(message))
    dispatch(showNotify());
    setTimeout(() => {
      dispatch(hideNotify());
      dispatch(removeText())
    }, 5000);
  }
  return [toggleNotify]
  }
 

