import React from 'react'

export const OrderDetails = ({order} : any) => {
    const getFormattedDate = (date : any) => {
        const formattedDate = date.split('T')
        const datePart = formattedDate[0].match(/\d+/g),
        year = datePart[0].substring(2),
        month = datePart[1], day = datePart[2];
        return day + "." + month + "." + year;
      }
  return (
    <div>
      {" "}
      <div key={order.id}>
        <p>{order.id}</p>
        <p>{order.data}</p>
        <p>{order.status}</p>
        <p>{getFormattedDate(order.updatedAt)}</p>
      </div>
    </div>
  );
}
