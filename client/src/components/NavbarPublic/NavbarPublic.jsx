import React from 'react';
import { Button, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link, NavLink, useNavigate } from 'react-router';
import './NavbarPublic.css';
import logo from '../../assets/images/logonegro.png'

export const NavbarPublic = () => {
  const navigate = useNavigate();

  return (
    <Navbar expand="lg" className="navbar">
  <Container>
    <Navbar.Brand as={Link} to="/">
      <img src={logo} alt="Maternando360 logo" />
    </Navbar.Brand>

    <Navbar.Toggle aria-controls="basic-navbar-nav" />

    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto text-center text-lg-start">
        <Nav.Link as={NavLink} to="/">Inicio</Nav.Link>
        <Nav.Link as={NavLink} to="/about">Sobre mí</Nav.Link>

        <NavDropdown title="Servicios" id="servicios-dropdown">
          <NavDropdown.Item as={NavLink} to="/accompaniment">
            Acompañamiento
          </NavDropdown.Item>
          <NavDropdown.Item as={NavLink} to="/dream">
            Regulación y Sueño
          </NavDropdown.Item>
        </NavDropdown>

        <NavDropdown title="Formación" id="formacion-dropdown">
          <NavDropdown.Item as={NavLink} to="/workshops">
            Talleres
          </NavDropdown.Item>
          <NavDropdown.Item as={NavLink} to="/courses">
            Cursos
          </NavDropdown.Item>
        </NavDropdown>

        <Nav.Link as={NavLink} to="/rates">Tarifas</Nav.Link>
      </Nav>

      <div className="d-flex flex-column flex-lg-row gap-2 mt-3 mt-lg-0">
        <Button className="my-btn" onClick={() => navigate('/login')}>
          Iniciar Sesión
        </Button>
        <Button className="my-btn" onClick={() => navigate('/register')}>
          Registro
        </Button>
      </div>
    </Navbar.Collapse>
  </Container>
</Navbar>
  );
};
