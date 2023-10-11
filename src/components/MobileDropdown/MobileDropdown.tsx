import React from 'react'
import './style.scss'
import { AccountDropdown } from './AccountDropdown';
import { MobileCartDropdown } from './MobileCartDropdown';

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
        <MobileCartDropdown />
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
