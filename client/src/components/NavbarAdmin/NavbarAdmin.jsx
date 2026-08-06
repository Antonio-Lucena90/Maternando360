import React, { useContext, useEffect, useState } from 'react'
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';
import { fetchData } from '../../helpers/axiosHelper';
import logo from '../../assets/images/logonegro.png'

export const NavbarAdmin = () => {

  const { logOut, user, token } = useContext(AuthContext);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!token) return;
    const load = async () => {
      try {
        const res = await fetchData('message/admin/unread', 'GET', null, token);
        setUnreadCount(res.data.count);
      } catch {
        // silencioso
      }
    };
    load();
    const interval = setInterval(load, 60000);
    window.addEventListener('admin-messages-read', load);
    return () => {
      clearInterval(interval);
      window.removeEventListener('admin-messages-read', load);
    };
  }, [token]);
  return (
<Navbar expand="lg" className="navbar">
  <Container>
    <Navbar.Brand as={Link} to="/">
      <img src={logo} alt="Maternando360 logo" />
    </Navbar.Brand>

    <Navbar.Toggle aria-controls="admin-navbar-nav" />

    <Navbar.Collapse id="admin-navbar-nav">
      <Nav className="me-auto text-center text-lg-start">
        <Nav.Link as={NavLink} to="/">Inicio</Nav.Link>
        <Nav.Link as={NavLink} to="/admin/allWorkshops">
          Talleres
        </Nav.Link>
        <Nav.Link as={NavLink} to="/admin/allUsers">
          Usuarios
        </Nav.Link>
        <Nav.Link as={NavLink} to="/admin/reviews">
          Reseñas
        </Nav.Link>
        <Nav.Link as={NavLink} to="/admin/appointments">
          Establecer Citas
        </Nav.Link>
        <Nav.Link as={NavLink} to="/admin/messages">
          Mensajes {unreadCount > 0 && <span className="nav-new-badge">{unreadCount}</span>}
        </Nav.Link>
      </Nav>

      <div className="d-flex flex-column flex-lg-row align-items-center gap-3 mt-3 mt-lg-0">
        <p className="m-0 text-center text-lg-start">
          Administrador: {user.name} {user.last_name}
        </p>

        <Button className="my-btn" onClick={logOut}>
          LogOut
        </Button>
      </div>
    </Navbar.Collapse>
  </Container>
</Navbar>
  );
};
  