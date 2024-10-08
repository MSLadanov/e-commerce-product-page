import { useRef } from "react";
import "./style.scss";

interface BurgerProps {
    openMenu: boolean,
    setOpenMenu: (state: boolean) => void
}

function Burger({openMenu, setOpenMenu} : BurgerProps) {
  const burgerRef = useRef(document.createElement("div"));
  const burgerClasses = ["rotate-up", "hiding", "rotate-down"];
  function toggleBurger(e: React.MouseEvent | React.TouchEvent) {
    if (
      e.target === burgerRef.current ||
      burgerRef.current.contains(e.currentTarget)
    ) {
      let counter = 0;
      for (const child of burgerRef.current.children) {
        child.classList.toggle(burgerClasses[counter]);
        counter++;
      }
      setOpenMenu(!openMenu)
    }
  }
  return (
    <div
      className="logo-mobile"
      ref={burgerRef}
      onClick={(e) => toggleBurger(e)}
    >
      <div className={openMenu ? 'burger rotate-up' : 'burger'}></div>
      <div className={openMenu ? 'burger hiding' : 'burger'} ></div>
      <div className={openMenu ? 'burger rotate-down' : 'burger'}></div>
    </div>
  );
}

export default Burger;
