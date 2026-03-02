import React, { useEffect, useState } from 'react'
import { fetchData } from '../../../helpers/axiosHelper';
import { Col, Container, Row } from 'react-bootstrap';
import './allWorkshopsPublic.css'

const AllWorkshopsPublic = () => {
  const [workshops, setWorkshops] = useState([]);
    useEffect(()=>{
      const fetchWorkshops = async () => {
        try {
          let res = await fetchData('workshop/allWorkshops', 'GET');
          setWorkshops(res.data.result);
        } catch (error) {
          console.log(error); 
        }
      }
      fetchWorkshops();
    }, []);
  
  
    const today = new Date();
    const comingWorkshops = workshops
      .filter(e => new Date(e.workshop_start_date) >= today)
      .sort((a,b) => new Date(a.workshop_start_date) - new Date(b.workshop_start_date));
  return (
    <>
       <Container>
        <Row>
          <Col className='d-flex flex-column justify-content-center align-items-center'>
            <h2>Próximos Talleres</h2>
            <div className='div-ppal-workshops'>
              {comingWorkshops.map((elem,idx)=>{
                return(
                  <div key={idx} className='card-workshop'>
                    <p className='card-title'>{elem.workshop_name}</p>
                    <p className='card-info'><strong>Lugar:</strong> {elem.city}</p>
                    <p className='card-info'><strong>Fecha:</strong> {elem.workshop_start_date.split('-').reverse().join('-')}</p>
                  </div>  
                )
              })}
            </div>
          </Col>
          </Row>
          </Container>
    </>
  )
}

export default AllWorkshopsPublic