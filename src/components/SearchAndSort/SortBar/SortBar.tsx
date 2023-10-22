import React from 'react'

export const SortBar = () => {
  return (
    <div>
      <select>
      <option value="" disabled>Sort by...</option>
        <option value="">Price &uarr;</option>
        <option value="">Discount &uarr;</option>
        <option value="">Price &darr;</option>
        <option value="">Discount &darr;</option>
      </select>
    </div>
  );
}
