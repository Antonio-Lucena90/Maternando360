import React from 'react'
import { Outlet } from 'react-router'
import { NavbarAdmin } from '../components/NavbarAdmin/NavbarAdmin'
import { Footer } from '../components/Footer/Footer'

export const AdminLayout = () => {
  return (
  
        <>
    <header>
      <NavbarAdmin/>
    </header>
    <main className='main'>
      <Outlet/>
    </main>
    <footer className='footer'>
      <Footer/>
    </footer>
    </>

  )
}
