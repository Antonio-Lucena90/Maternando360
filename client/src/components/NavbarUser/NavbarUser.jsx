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
   <Navbar expand="lg" className="navbar">
  <Container>
    <Navbar.Brand as={Link} to="/">
      <img src={logo} alt="Maternando360 logo" />
    </Navbar.Brand>

    <Navbar.Toggle aria-controls="user-navbar-nav" />

    <Navbar.Collapse id="user-navbar-nav">
      <Nav className="me-auto text-center text-lg-start">
        <Nav.Link as={NavLink} to="/userPage">Tu Muro</Nav.Link>
        <Nav.Link as={NavLink} to="/profile">Perfil</Nav.Link>
        <Nav.Link as={NavLink} to="/courses">Mis Cursos</Nav.Link>
        <Nav.Link as={NavLink} to="/workshops">Mis Talleres</Nav.Link>
      </Nav>

      <div className="d-flex flex-column flex-lg-row align-items-center gap-3 mt-3 mt-lg-0">
        <div className="d-flex align-items-center gap-2">
          <p className="m-0 text-center text-lg-start">
            {user?.name} {user?.last_name}
          </p>
          <div
            className="nav-simbol"
            onClick={() => navigate('/profile')}
            title="Ir a perfil"
          >
            {user?.name[0].toUpperCase()}
            {user?.last_name[0].toUpperCase()}
          </div>
        </div>

        <Button className="my-btn" onClick={logOut}>
          LogOut
        </Button>
      </div>
    </Navbar.Collapse>
  </Container>
</Navbar>
  );
};
