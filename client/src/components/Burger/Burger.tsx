import { useRef } from "react";
import "./style.scss";

function Burger() {
  const burgerRef = useRef(document.createElement('div'))
  function toggleBurger(e : React.MouseEvent | React.TouchEvent) {
    if(e.target === burgerRef.current || burgerRef.current.contains(e.currentTarget)){
        console.log('Burger')
    }
  }
  return (
    <div className="logo-mobile" ref={burgerRef} onClick={(e) => toggleBurger(e)}>
      <div className="burger"></div>
      <div className="burger"></div>
      <div className="burger"></div>
    </div>
  );
}

export default Burger;
