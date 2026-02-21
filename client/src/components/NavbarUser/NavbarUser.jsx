import React, { useContext } from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { Link, NavLink, useNavigate } from 'react-router';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';
import './navbarUser.css';
import logo from '../../assets/images/logonegro.png'

export const NavbarUser = () => {
  const navigate = useNavigate();
  const { logOut, user } = useContext(AuthContext);

  return (
    <Navbar className="navbar">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src={logo} alt="" />
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={NavLink} to="/userPage">
            Tu Muro
          </Nav.Link>
          <Nav.Link as={NavLink} to="/Profile">
            Perfil
          </Nav.Link>
          <Nav.Link as={NavLink} to="/courses">
            Mis Cursos
          </Nav.Link>
          <Nav.Link as={NavLink} to="/workshops">
            Mis Talleres
          </Nav.Link>
        </Nav>
        <div className="d-flex gap-2">
          <div className="d-flex gap-2 align-items-center">
            <p className="m-0">
              {user?.name} {user?.last_name}
            </p>
            <div className="nav-simbol" onClick={() => navigate('/profile')}>
              {user?.name[0].toUpperCase()}{user?.last_name[0].toUpperCase()}
            </div>
          </div>
        </div>
        <div>
          <Button className="my-btn" onClick={logOut}>
            LogOut
          </Button>
        </div>
      </Container>
    </Navbar>
  );
};
