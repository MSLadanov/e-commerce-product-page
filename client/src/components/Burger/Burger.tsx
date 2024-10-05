import { useRef } from "react";
import "./style.scss";

function Burger() {
  const burgerRef = useRef(document.createElement('div'))
  const burgerClasses = ['rotate-up', 'hiding', 'rotate-down']
  function toggleBurger(e : React.MouseEvent | React.TouchEvent) {
    if(e.target === burgerRef.current || burgerRef.current.contains(e.currentTarget)){
        burgerRef.current.children[0]
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
