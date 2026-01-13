import React from 'react';
import { Outlet } from 'react-router';
import { NavbarPublic } from '../components/NavbarPublic/NavbarPublic';

export const PublicLayout = () => {
  return (
    <>
      <header>
        <NavbarPublic/>
      </header>
      <main className='main-public'>
        <Outlet />
      </main>
      <footer className='footer-public'>PublicFooter</footer>
    </>
  );
};
