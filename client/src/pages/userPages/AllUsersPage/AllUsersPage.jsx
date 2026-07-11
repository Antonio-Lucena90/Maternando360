import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthContext/AuthContext';
import { Container, Col, Row } from 'react-bootstrap';
import './allUserPage.css';
import docu from '../../../assets/icons/docu.svg';
import calendar from '../../../assets/icons/calendar.svg';
import { useNavigate } from 'react-router';
import axios from 'axios';

const API_URL = import.meta.env.VITE_SERVER_URL;

const AllUsersPage = () => {
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get(
          `${API_URL}appointments/user/${user.user_id}`,
          { headers: { Authorization: `Bearer ${token}` } },
        );
        setAppointments(res.data.result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAppointments();
  }, []);

  return (
    <>
      <div className="page-hero">
        <h1>
          {user.baby_name
            ? `¿Cómo estáis hoy, ${user.name} y ${user.baby_name}?`
            : `¿Cómo estás hoy, ${user.name}?`}
        </h1>
        <p>Este es tu espacio. Aquí puedes consultar tus citas, documentos y registros de sueño.</p>
      </div>

      <Container>
        {appointments.length > 0 && (
          <div className="appointments-section">
            <h2>Tus próximas citas</h2>
            <Row className="justify-content-center w-100">
              {appointments.map((a) => (
                <Col key={a.appointment_id} xs={12} md={6} lg={4}>
                  <div className="appointment-card">
                    <p><strong>Fecha:</strong>{' '}{new Date(a.appointment_date).toLocaleDateString('es-ES')}</p>
                    <p><strong>Hora:</strong> {a.appointment_time.slice(0, 5)}</p>
                    {a.notes && <p><strong>Notas:</strong> {a.notes}</p>}
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        )}

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
    </>
  );
};

export default AllUsersPage;
