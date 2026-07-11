import { useContext, useEffect, useState } from 'react';
import { fetchData } from '../../../helpers/axiosHelper';
import { AuthContext } from '../../../contexts/AuthContext/AuthContext';
import { Container, Button, Modal } from 'react-bootstrap';
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
      await fetchData(`workshop/deleteWorkshop/${workshop_id}`, 'DELETE', null, token);
      setAllWorkshops(allWorkshops.filter((e) => e.workshop_id !== workshop_id));
      setShowModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="page-hero">
        <h1>Gestión de Talleres</h1>
        <p>Crea, edita y elimina los talleres de Maternando360.</p>
      </div>

      <Container>
        <div className="workshops-admin-list">
          {allWorkshops?.map((elem) => (
            <div key={elem.workshop_id} className="workshop-admin-row">
              <div className="workshop-admin-body">
                <h3 className="workshop-admin-name">{elem.workshop_name}</h3>
                <p className="workshop-admin-desc">{elem.description}</p>
                <div className="workshop-admin-meta">
                  {elem.city && <span>📍 {elem.city}</span>}
                  {elem.duration && <span>⏱ {elem.duration}</span>}
                  <span>📅 {new Date(elem.workshop_start_date).toLocaleDateString('es-ES')}</span>
                  <span className="workshop-admin-price">{elem.price} €</span>
                </div>
              </div>
              <div className="workshop-admin-actions">
                <Button className="my-btn" onClick={() => navigate(`/admin/editWorkshops/${elem.workshop_id}`)}>
                  Editar
                </Button>
                <Button className="my-btn my-btn--danger" onClick={() => setShowModal(elem.workshop_id)}>
                  Eliminar
                </Button>
              </div>

              <Modal show={showModal === elem.workshop_id} onHide={() => setShowModal(false)} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                  <Modal.Title>¿Eliminar este taller?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Esta acción no se puede deshacer.</Modal.Body>
                <Modal.Footer>
                  <Button className="my-btn" onClick={() => setShowModal(false)}>Cancelar</Button>
                  <Button className="my-btn my-btn--danger" onClick={() => deleteWorkshop(elem.workshop_id)}>Eliminar</Button>
                </Modal.Footer>
              </Modal>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
};

export default AllWorkshops;
