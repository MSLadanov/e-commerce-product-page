import React from 'react'
import { useSelector } from 'react-redux'
import './style.scss'
import { getNotifyData } from '../../redux/slices/notifySlice';

export const Notification = () => {
  const notify = useSelector(getNotifyData);
  return (
    <div className='notify'>{notify}</div>
  )
}
