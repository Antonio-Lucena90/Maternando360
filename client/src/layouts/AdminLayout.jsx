import React from 'react'
import { Outlet } from 'react-router'
import { NavbarAdmin } from '../components/NavbarAdmin/NavbarAdmin'

export const AdminLayout = () => {
  return (
  
        <>
    <header>
      <NavbarAdmin/>
    </header>
    <main className='main-user'>
      <Outlet/>
    </main>
    <footer>
      AdminFooter
    </footer>
    </>

  )
}
