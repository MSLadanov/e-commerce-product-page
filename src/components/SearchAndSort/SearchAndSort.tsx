import React from 'react'
import { SearchBar } from './SearchBar/SearchBar'
import { SortBar } from './SortBar/SortBar'
import './style.scss'

export const SearchAndSort = () => {
  return (
    <div>
      <SearchBar></SearchBar>
      <SortBar></SortBar>
    </div>
  );
}
