import React from 'react';
import { Outlet } from 'react-router';
import { NavbarPublic } from '../components/NavbarPublic/NavbarPublic';
import { Footer } from '../components/Footer/Footer';

export const PublicLayout = () => {
  return (
    <>
      <header>
        <NavbarPublic/>
      </header>
      <main className='main-public'>
        <Outlet />
      </main>
      <footer className='footer'>
        <Footer/>
      </footer>
    </>
  );
};
