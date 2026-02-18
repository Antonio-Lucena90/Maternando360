import React, { useContext, useEffect, useState } from 'react'
import { fetchData } from '../../../helpers/axiosHelper'
import { AuthContext } from '../../../contexts/AuthContext/AuthContext';
import '../AdminDashboard/adminDashboard.css'
import { Col, Container, Row } from 'react-bootstrap';

const AllUsersRegistered = () => {
  const [users, setUsers] = useState([]);
  const {token} = useContext(AuthContext);
  useEffect(()=>{
    const fetchUser = async() => {
      try {
        let res = await fetchData('admin/allUsersRegistered', 'GET', null, token);
        console.log(res.data.result);
        setUsers(res.data.result);
      } catch (error) {
        console.log(error);
        
      }
    }
    fetchUser();
  }, []);
  
  return (
    <Container>
      <Row>
   {users?.map((elem)=>{
        return(
          <Col>
          <div className='dashboard-Card'>
          <p>Nombre: {elem.name}</p>
          <p>Apellidos: {elem.last_name}</p>
          <p>Fecha de Nacimiento: {elem.birth_date.split('-').reverse().join('-')}</p>
          <p>Email: {elem.email}</p>
          <p>Teléfono: {elem.phone}</p>
        </div>
        </Col>
        )
      })} 
      </Row>
    </Container>
  )
}

export default AllUsersRegistered