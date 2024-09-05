import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSearchData } from '../../../redux/slices/searchSlice'
import { changeSearch } from '../../../redux/slices/searchSlice'
import '../style.scss'

export const SearchBar = () => {
  const dispatch = useDispatch()
  const search = useSelector(getSearchData);
  return (
    <div>
      <input type="text" defaultValue={search} onChange={(e) => dispatch(changeSearch(e.target.value))}>
        
      </input>
    </div>
  )
}
