import React from 'react';
import { Button, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link, NavLink, useNavigate } from 'react-router';
import './NavbarPublic.css';

export const NavbarPublic = () => {
  const navigate = useNavigate();

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
          <Nav.Link as={NavLink} to="/about">
            Sobre mí
          </Nav.Link>
         <NavDropdown title="Servicios" id="basic-nav-dropdown">
            <NavDropdown.Item href="/accompaniment">
              Acompañamiento
            </NavDropdown.Item>
            <NavDropdown.Item href="/dream">Regulación y Sueño</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Formación" id="basic-nav-dropdown">
            <NavDropdown.Item href="/workshops">
              Talleres
            </NavDropdown.Item>
            <NavDropdown.Item href="/courses">Cursos</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link as={NavLink} to="/rates">
            Tarifas
          </Nav.Link>
        </Nav>
        <div className="d-flex gap-3">
          <div className="d-flex gap-3">
            <div>
              <Button className="my-btn" onClick={() => navigate('/login')}>
                Iniciar Sesión
              </Button>
            </div>
            <div>
              <Button className="my-btn" onClick={() => navigate('/register')}>
                Registro
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Navbar>
  );
};
