import React, { useContext, useState } from 'react';
import { Container, Row, Col, Modal, Button } from 'react-bootstrap';
import { AuthContext } from '../../../contexts/AuthContext/AuthContext';
import { WorkshopCard } from '../../../components/WorkshopCard/WorkshopCard';
import { fetchData } from '../../../helpers/axiosHelper';

const WorkshopReser = () => {
  const { workshops, user, token } = useContext(AuthContext);
  const [selectedWorkshop, setSelectedWorkshop] = useState(workshops);

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

  const onSubmit = async(workshop_id)=>{
    try {
      const res = await fetchData(`user/workshopRegistration/${user.user_id}/${workshop_id}`, 'POST', null, token);
      console.log(res);
      setSelectedWorkshop(null);
    } catch (error) {
      console.log(error);
      
    }
  }

  return (
    <>
      <Container>
        <Row>
          <h1>Elige tu taller a realizar</h1>
          <Col className='d-flex flex-wrap justify-content-center mt-5 gap-5'>
                {comingWorkshops?.map((elem) => {
                  return (
                    <div key={elem.workshop_id}>
                      <WorkshopCard 
                          workshops={elem} 
                          onSubmit={onSubmit}
                          setSelectedWorkshop={setSelectedWorkshop}

                        />
                    </div>
                  );
                })}
          </Col>
      {selectedWorkshop && (
        <Modal
          show={selectedWorkshop.workshop_id}
          onHide={() => setSelectedWorkshop(null)}
          centered
          backdrop={false}
          keyboard={false}
        >
          <Modal.Header closeButton className="background-card">
            <Modal.Title>Confirma la elección</Modal.Title>
          </Modal.Header>

          <Modal.Body className="background-card">
            <p>
              ¿Confirmas la elección para el taller {selectedWorkshop?.workshop_name} en{' '}
              {selectedWorkshop?.city}?
            </p>
          </Modal.Body>

          <Modal.Footer className="background-card">
            <Button className="my-btn-modal" onClick={() => setSelectedWorkshop(null)}>
              Cancelar
            </Button>

            <Button className="my-btn-modal" onClick={()=>onSubmit(selectedWorkshop.workshop_id)}>Aceptar</Button>
          </Modal.Footer>
        </Modal>
      )}
        </Row>
      </Container>
    </>
  );
};

export default WorkshopReser;
