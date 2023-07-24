import React from "react";
import "./style.scss";

export const SneakerCard = ({ sneaker }: any) => {
  return (
    <div className="card">
      <img
        src={`http://localhost:3001/${sneaker.img1}`}
        alt={`${sneaker.brand} ${sneaker.name}`}
      />
      <h2>{`${sneaker.name}`}</h2>
      <h3>{`${sneaker.brand}`}</h3>
      <h4>{`${sneaker.price} $`}</h4>
      <button>Add to cart</button>
    </div>
  );
};
