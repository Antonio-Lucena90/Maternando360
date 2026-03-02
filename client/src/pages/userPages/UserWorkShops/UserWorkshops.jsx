import React, { useContext, useEffect, useState } from 'react'
import { fetchData } from '../../../helpers/axiosHelper'
import { AuthContext } from '../../../contexts/AuthContext/AuthContext'
import { Col, Container, Row } from 'react-bootstrap';
import './userworkshop.css'

const UserWorkshops = () => {
  const {token, user} = useContext(AuthContext);
  const [userWorkshops, setUserWorkshops] = useState([]);
  useEffect(()=>{
    const fetchWorkshopUser = async() =>{
      const res = await fetchData(`user/fetchWorkshop/${user.user_id}`, 'GET', null, token);
      console.log(res);
      setUserWorkshops(res.data.result);
    }
    fetchWorkshopUser();
  },[])

  
  return (
    <>
    <Container>
      <Row>
        <h1>Mis Talleres</h1>
        <Col className='d-flex flex-wrap justify-content-center mt-5 gap-5'>
          {userWorkshops?.map((elem)=>{
            return(
              <div className='my-card'>
                <h2>{elem.workshop_name}</h2>
                <span>
              <strong>Descripción</strong>: {elem?.description}
            </span>
            <span>
              <strong>Lugar</strong>: {elem?.city}
            </span>
            <span>
              <strong>Fecha</strong>:{' '}
              {elem?.workshop_start_date?.split('-').reverse().join('-')}
            </span>
            <span>
              <strong>Duración</strong>: {elem?.duration}
            </span>
              </div>
            )
          })}
        </Col>
      </Row>
    </Container>
    </>
  )
}

export default UserWorkshops