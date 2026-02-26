import React, { useContext } from 'react'
import { AuthContext } from '../../../contexts/AuthContext/AuthContext'
import { Col, Container, Row } from 'react-bootstrap';
import './allUserPage.css'

const AllUsersPage = () => {

  const {user} = useContext(AuthContext);
  return (
    <>
      <Container>
        <h1>Bienvenid@ {user.name} {user.last_name}</h1>
          <Row className='my-row'>
            <Col xs={12} md={6} lg={4}>
              <h2>Mis Citas</h2>
            </Col>
            <Col>
              <h2>Mis Cursos</h2>
            </Col>
            <Col>
              <h2>Mis Talleres</h2>
            </Col>
          </Row>
      </Container>
    </>
  )
}

export default AllUsersPage