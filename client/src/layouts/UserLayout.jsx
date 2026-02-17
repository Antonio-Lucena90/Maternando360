import React from 'react'
import { Outlet } from 'react-router'
import { NavbarUser } from '../components/NavbarUser/NavbarUser'

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
      UserUser
    </footer>
    </>
  )
}
