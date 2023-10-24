import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getSortData } from '../../../redux/slices/sortSlice';
import { changeSort } from '../../../redux/slices/sortSlice';
import '../style.scss'

export const SortBar = () => {
  const dispatch = useDispatch()
  const sort = useSelector(getSortData);
  const getDefaultSort = (type:any) =>{
    switch (type) {
      case 'price_up':
        return `Price ↑`
      case 'discount_up':
        return `Discount ↑`
      case 'discount_down':
        return `Discount ↓`
      case 'price_down':
        return `Price ↓`
      default:
        return `Sort by...`
    }
  }
  return (
    <div>
      <select onChange={(e) => dispatch(changeSort(e.target.value))}>
        <option value={sort} selected disabled>{getDefaultSort(sort)}</option>
        <option value="price_up">Price &uarr;</option>
        <option value="discount_up">Discount &uarr;</option>
        <option value="discount_down">Discount &darr;</option>
        <option value="price_down">Price &darr;</option>
      </select>
    </div>
  );
}
