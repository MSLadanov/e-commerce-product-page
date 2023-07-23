import React from "react";
import "./style.scss";

export const SneakerCard = ({ sneaker }: any) => {
  return (
    <div>
      <img
        src={`http://localhost:3001/${sneaker.img1}`}
        alt={`${sneaker.brand} ${sneaker.name}`}
      />
    </div>
  );
};
