import React from 'react'
import Header from '../../Components/Header/Header';
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';

const UserLayout = () => {
  return (
    <div >
      <Header></Header>
      <Outlet></Outlet>
      <ToastContainer />
    </div>
  )
}

export default UserLayout
