import React, { useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { AuthContext } from '../../../contexts/AuthContext/AuthContext';
import { WorkshopCard } from '../../../components/WorkshopCard/WorkshopCard';

const WorkshopReser = () => {
  const { workshops } = useContext(AuthContext);
  const date = new Date();
  date.setDate(date.getDate() + 7) 
  const workshopsDate = workshops.filter((e=>{
    return(
      new Date(e.workshop_start_date) >= date
    )
  }))

  const comingWorkshops = workshopsDate.sort((a,b)=>{
    return new Date(a.workshop_start_date) - new Date (b.workshop_start_date);
  })

  return (
    <>
      <Container>
        <Row>
          <h1>Elige tu taller a realizar</h1>
          <Col className='d-flex flex-wrap gap-5'>
                {comingWorkshops?.map((elem) => {
                  return (
                    <div key={elem.workshop_id}>
                      <WorkshopCard workshops={elem}/>
                    </div>
                  );
                })}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default WorkshopReser;
