import React from "react";
import "./style.scss";

export const SneakerCard = ({ sneaker }: any) => {
  return (
    <div className="card">
      <div className="discount">{`${sneaker.discount}%`}</div>
      <a href={`http://localhost:3000/${sneaker.sex.toLowerCase()}/sneaker/${sneaker.id}`}>
        <img
          src={`http://localhost:3001/${sneaker.img1}`}
          alt={`${sneaker.brand} ${sneaker.name}`}
        />
      </a>
      <h2>{`${sneaker.name}`}</h2>
      <h3>{`${sneaker.brand}`}</h3>
      <h4>{`${sneaker.price} $`}</h4>
    </div>
  );
};
