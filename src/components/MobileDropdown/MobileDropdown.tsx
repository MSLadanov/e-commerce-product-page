import React from 'react'
import './style.scss'
import { AccountDropdown } from './AccountDropdown';

export const MobileDropdown = ({openMobileDropdown}:any) => {
  console.log(openMobileDropdown)
  if(openMobileDropdown === 'account'){
    return <div className="dropdown-modal">
      <AccountDropdown/>
    </div>;
  }
  else if (openMobileDropdown === 'cart'){
    return (
      <div className='dropdown-modal'>
        <h1>Cart</h1>
      </div>
    )
  }
  else{
    return (
      <div className="dropdown-modal">
        <h1>Error!</h1>
      </div>
    );
  }
}
