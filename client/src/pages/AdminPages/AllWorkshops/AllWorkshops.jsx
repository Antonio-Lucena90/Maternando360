import { useContext, useEffect, useState } from 'react';
import { fetchData } from '../../../helpers/axiosHelper';
import { AuthContext } from '../../../contexts/AuthContext/AuthContext';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import './allWorkshops.css';
import { useNavigate } from 'react-router';

const AllWorkshops = () => {
  const { token } = useContext(AuthContext);
  const [allWorkshops, setAllWorkshops] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        const res = await fetchData('workshop/allWorkshops', 'GET');
        setAllWorkshops(res.data.result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchWorkshops();
  }, []);

  const deleteWorkshop = async (workshop_id) => {
    try {
      let res = await fetchData(
        `workshop/deleteWorkshop/${workshop_id}`,
        'DELETE',
        null,
        token,
      );
      console.log(res);
      setAllWorkshops(
        allWorkshops.filter((e) => e.workshop_id !== workshop_id),
      );
      setShowModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    setShowModal(false)
  }

  return (
    <>
      <Container>
        <Row>
          <Col>
            <div className="div-ppal">
              {allWorkshops?.map((elem) => {
                return (
                  <div key={elem.workshop_id} className="div-map">
                    <h2>Nombre: {elem.workshop_name}</h2>
                    <p>Duración: {elem.duration}</p>
                    <p>Lugar: {elem.city}</p>
                    <p>Fecha de inicio: {elem.workshop_start_date}</p>
                    <p>Fecha final: {elem.workshop_end_date}</p>
                    <p>Descripción: {elem.description}</p>
                    <div className="d-flex gap-4">
                      <Button
                        className="my-btn"
                        onClick={() =>
                          navigate(`/admin/editWorkshops/${elem.workshop_id}`)
                        }
                      >
                        Editar
                      </Button>
                      <Button
                        className="my-btn"
                        onClick={() => setShowModal(true)}
                      >
                        Eliminar
                      </Button>
                    </div>
                    <div>
              <Modal
                show={showModal}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
              >
                <Modal.Header closeButton className="modal-header">
                  <Modal.Title>¿Estás seguro que quieres eliminar este Taller?</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-body">
                </Modal.Body>
                <Modal.Footer className="modal-footer">
                  <Button className="my-btn" onClick={handleClose}>
                    Cancelar
                  </Button>
                  <Button className="my-btn" onClick={()=>deleteWorkshop(elem.workshop_id)}>
                    Eliminar
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
                  </div>
                );
              })}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AllWorkshops;
