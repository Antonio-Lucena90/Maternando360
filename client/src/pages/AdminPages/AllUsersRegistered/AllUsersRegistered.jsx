import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { fetchData } from '../../../helpers/axiosHelper'
import { AuthContext } from '../../../contexts/AuthContext/AuthContext';
import '../AdminDashboard/adminDashboard.css'
import './allUsersRegistered.css'
import { Col, Container, Row } from 'react-bootstrap';

const AllUsersRegistered = () => {
  const [users, setUsers] = useState([]);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        let res = await fetchData('admin/allUsersRegistered', 'GET', null, token);
        setUsers(res.data.result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);

  return (
    <>
      <div className="page-hero">
        <h1>Usuarias registradas</h1>
        <p>Consulta los perfiles, registros de sueño y documentos de cada usuaria.</p>
      </div>

      <Container>
        <Row>
          {users?.map((elem) => (
            <Col key={elem.user_id} xs={12} md={6} lg={4}>
              <div className="dashboard-Card user-card">
                <p><strong>{elem.name} {elem.last_name}</strong></p>
                <p className="user-card-email">{elem.email}</p>
                {elem.baby_name && <p className="user-card-email">Bebé: {elem.baby_name}</p>}
                <button
                  className="btn-user-records"
                  onClick={() => navigate(`/admin/userRecords/${elem.user_id}`, {
                    state: { userName: `${elem.name} ${elem.last_name}` }
                  })}
                >
                  Ver registros de sueño
                </button>
                <button
                  className="btn-user-docs"
                  onClick={() => navigate(`/admin/userDocs/${elem.user_id}`, {
                    state: { userName: `${elem.name} ${elem.last_name}` }
                  })}
                >
                  Ver documentos
                </button>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default AllUsersRegistered;
