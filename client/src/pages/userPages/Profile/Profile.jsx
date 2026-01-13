import React, { useContext, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { AuthContext } from '../../../contexts/AuthContext/AuthContext';
import './profile.css';
import { useNavigate } from 'react-router';
import { FormCourse } from '../../../components/FormCourse/FormCourse';

const Profile = () => {
  const [showFormCourse, setShowFormCourse] = useState(false)
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  return (
    <>
      <Container>
        <Row className="profile-box">
          <Col xs={4} className="p-4">
            <h2>Tu Perfil</h2>
            <hr />
            <p>Nombre: {user.name}</p>
            <p>Apellidos: {user.last_name}</p>
            <p>Email: {user.email}</p>
            <p>Teléfono: {user.phone}</p>
            <p>Fecha de Nacimiento: {user.birth_date.split('-').reverse().join('-')}</p>
            <div className='d-flex gap-2'>
              <Button className="my-btn" onClick={()=>navigate('/editUser')}>Editar</Button>
              <Button className="my-btn">Eliminar</Button>
            </div>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row className='d-flex justify-content-center p-4'>
          <Col xs={4}>
            {!showFormCourse ? <Button onClick={()=>setShowFormCourse(true)}>Añadir Curso</Button> : <FormCourse setShowFormCourse={setShowFormCourse}/>}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;
