import React, { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthContext/AuthContext';
import { Container } from 'react-bootstrap';
import './allUserPage.css';
import docu from '../../../assets/icons/docu.svg'
import calendar from '../../../assets/icons/calendar.svg'
import { useNavigate } from 'react-router';

const AllUsersPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <Container>
      <h1>
        Bienvenid@ {user.name} {user.last_name}
        {user.baby_name && <span> · Bebé: {user.baby_name}</span>}
      </h1>
      <div className="dashboard-grid">
        <div className="dashboard-Card" onClick={() => navigate('/docus')}>
          <img src={docu} className="dashboard-icon" alt="Documentos" />
          <p>Documentos</p>
        </div>
        <div className="dashboard-Card" onClick={() => navigate('/dreamRegister')}>
          <img src={calendar} className="dashboard-icon" alt="Registro de Sueño" />
          <p>Registro de Sueño</p>
        </div>
      </div>
    </Container>
  );
};

export default AllUsersPage;
