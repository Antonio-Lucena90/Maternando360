import React, { useContext, useEffect, useState } from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { Link, NavLink, useNavigate } from 'react-router';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';
import { fetchData } from '../../helpers/axiosHelper';
import './navbarUser.css';
import logo from '../../assets/images/logonegro.png';

export const NavbarUser = () => {
  const navigate = useNavigate();
  const { logOut, user, token } = useContext(AuthContext);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!token) return;
    const load = async () => {
      try {
        const res = await fetchData('message/unread', 'GET', null, token);
        setUnreadCount(res.data.count);
      } catch {
        // silencioso
      }
    };
    load();
    const interval = setInterval(load, 60000);
    window.addEventListener('messages-read', load);
    return () => {
      clearInterval(interval);
      window.removeEventListener('messages-read', load);
    };
  }, [token]);

  return (
    <Navbar expand="lg" className="navbar">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img className="img" src={logo} alt="Maternando360 logo" />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="user-navbar-nav" />

        <Navbar.Collapse id="user-navbar-nav">
          <Nav className="me-auto text-center text-lg-start">
            <Nav.Link as={NavLink} to="/profile">
              Perfil
            </Nav.Link>
            <Nav.Link as={NavLink} to="/userPage">
              Tu Muro
            </Nav.Link>
            <Nav.Link as={NavLink} to="/Docus">
              Documentos
            </Nav.Link>
            <Nav.Link as={NavLink} to="/DreamRegister">
              Registros de Sueño
            </Nav.Link>
            <Nav.Link as={NavLink} to="/reviews">
              Reseñas
            </Nav.Link>
            <Nav.Link as={NavLink} to="/messages">
              Mensajes {unreadCount > 0 && <span className="nav-new-badge">{unreadCount}</span>}
            </Nav.Link>
            <div className="d-flex gap-3">
              <a
                href="https://wa.me/34639943410?text=Hola%20,%20quiero%20pedir%20una%20cita%20para%20una%20consulta."
                target="_blank"
                className="mail"
                rel="noopener noreferrer"
              >
                Pedir cita
              </a>

              {/* <Button className='my-btn' onClick={()=>navigate('/fetchAppointment')}>Pedir Cita</Button> */}
            </div>
          </Nav>

          <div className="d-flex flex-column flex-lg-row align-items-center gap-3 mt-3 mt-lg-0">
            <div className="d-flex align-items-center gap-2">
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
