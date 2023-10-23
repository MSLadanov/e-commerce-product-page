import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getSortData } from '../../../redux/slices/sortSlice';
import { changeSort } from '../../../redux/slices/sortSlice';

export const SortBar = () => {
  const dispatch = useDispatch()
  const sort = useSelector(getSortData);
  const getDefaultSort = (type:any) =>{
    switch (type) {
      case 'price_up':
        return `Price &uarr;`
      case 'discount_up':
        return `Discount &uarr`
      case 'discount_down':
        return `Discount &darr;`
      case 'price_down':
        return `Price &darr`
    }
  }
  return (
    <div>
      <select onChange={(e) => dispatch(changeSort(e.target.value))}>
      <option value="" disabled hidden>Sort by...</option>
        <option value={sort} selected>{getDefaultSort(sort)}</option>
        <option value="price_up">Price &uarr;</option>
        <option value="discount_up">Discount &uarr;</option>
        <option value="discount_down">Discount &darr;</option>
        <option value="price_down">Price &darr;</option>
      </select>
    </div>
  );
}
