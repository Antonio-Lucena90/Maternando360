import React, { useContext, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { AuthContext } from '../../../contexts/AuthContext/AuthContext';
import './profile.css';
import { useNavigate } from 'react-router';
import { DeleteModal } from '../../../components/DeleteModal/DeleteModal';
import { fetchData } from '../../../helpers/axiosHelper';

const Profile = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();
  const { user, token, logOut } = useContext(AuthContext);

  const deleteProfile = async () => {
    try {
      let res = await fetchData('user/deleteUser', 'PUT', null, token);
      logOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="page-hero">
        <h1>Tu Perfil</h1>
        <p>Gestiona tu información personal y tu cuenta.</p>
      </div>

      <Container>
        <Row className="profile-box">
          <Col xs={12} md={6} lg={4} className="p-4">
            <hr />
            <p>Nombre: {user.name}</p>
            <p>Apellidos: {user.last_name}</p>
            <p>Email: {user.email}</p>
            {user.baby_name && <p>Nombre del bebé: {user.baby_name}</p>}
            <div className="d-flex gap-2 mt-3">
              <Button className="my-btn-profile" onClick={() => navigate('/editUser')}>Editar</Button>
              <Button className="my-btn-profile" onClick={() => setShowDeleteModal(true)}>Eliminar Cuenta</Button>
            </div>
            {showDeleteModal && <DeleteModal setShowDeleteModal={setShowDeleteModal} deleteProfile={deleteProfile} />}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;
