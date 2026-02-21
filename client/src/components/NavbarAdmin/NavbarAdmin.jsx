import React, { useContext } from 'react'
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';
import logo from '../../assets/images/logonegro.png'

export const NavbarAdmin = () => {

  const {logOut, user} = useContext(AuthContext)
  return (
    <Navbar className="navbar">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src={logo} alt="" />
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={NavLink} to="/">
            Inicio
          </Nav.Link>
          <Nav.Link as={NavLink} to="/admin/allWorkshops">
            Talleres
          </Nav.Link>
        </Nav>
        <div className="d-flex gap-3">
          <div className="d-flex gap-3">
            <div className='mt-2'>
              <p>Administrador: {user.name} {user.last_name}</p>
            </div>
            <div>
              <Button className='my-btn' onClick={logOut}>LogOut</Button>
            </div>
          </div>
        </div>
      </Container>
    </Navbar>
  );
};
  