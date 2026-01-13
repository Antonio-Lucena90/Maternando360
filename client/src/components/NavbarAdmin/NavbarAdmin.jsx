import React, { useContext } from 'react'
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';

export const NavbarAdmin = () => {
  

  const {logOut} = useContext(AuthContext)
  return (
    <Navbar className="navbar">
      <Container>
        <Navbar.Brand as={Link} to="/">
          MATERNANDO 360º
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={NavLink} to="/">
            Inicio
          </Nav.Link>
        </Nav>
        <div className="d-flex gap-3">
          <div className="d-flex gap-3">
            <div>
              <Button className='my-btn' onClick={logOut}>LogOut</Button>
            </div>
          </div>
        </div>
      </Container>
    </Navbar>
  );
};
  