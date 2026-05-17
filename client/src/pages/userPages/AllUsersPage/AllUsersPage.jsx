import React, { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthContext/AuthContext';
import { Col, Container, Row } from 'react-bootstrap';
import './allUserPage.css';
import docu from '../../../assets/icons/docu.svg'
import calendar from '../../../assets/icons/calendar.svg'
import { useNavigate } from 'react-router';

const AllUsersPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <>
      <Container>
        <h1>
          Bienvenid@ {user.name} {user.last_name}
          {user.baby_name && <span> · Bebé: {user.baby_name}</span>}
        </h1>
        <Row className="my-row">
          <Col xs={4}>
            <div className="dashboard-Card" onClick={() => navigate('/docus')} >
              <img src={docu} className="img" alt="Documentos" />
              <p>Documentos</p>
            </div>
          </Col>
          <Col xs={4}>
            <div className="dashboard-Card" onClick={() => navigate('/dreamRegister')}>
              <img src={calendar} className="img" alt="Registro de Sueño" />
              <p>Registro de Sueño</p>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AllUsersPage;
