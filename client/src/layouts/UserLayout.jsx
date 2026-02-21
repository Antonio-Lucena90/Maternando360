import React from 'react'
import { Outlet } from 'react-router'
import { NavbarUser } from '../components/NavbarUser/NavbarUser'
import { Footer } from '../components/Footer/Footer'

export const UserLayout = () => {
  return (
        <>
    <header>
      <NavbarUser/>
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
