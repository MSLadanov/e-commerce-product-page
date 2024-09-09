import React from "react";
import "./style.scss";

interface Sneaker {
  id: string,
  discount: number,
  name: string,
  brand: string,
  price: number,
  sex: string,
  img1: string,
}

export const SneakerCard = ({ sneaker }: { sneaker: Sneaker}) => {
  return (
    <div className="card">
      <div className={sneaker.discount > 0 ? 'discount' : 'discount zero-discount'}>{`${sneaker.discount}%`}</div>
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
