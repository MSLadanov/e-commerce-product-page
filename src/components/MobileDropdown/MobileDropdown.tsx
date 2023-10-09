import React from 'react'
import './style.scss'

export const MobileDropdown = ({openMobileDropdown}:any) => {
  console.log(openMobileDropdown)
  if(openMobileDropdown === 'account'){
    return <div className="dropdown-modal">
      <h1>Account</h1>
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
