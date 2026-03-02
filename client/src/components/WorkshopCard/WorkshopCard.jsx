import { Button, Card, Modal } from 'react-bootstrap';
import './workshopCard.css';

export const WorkshopCard = ({ workshops, setSelectedWorkshop }) => {
  
  return (
    <>
      <Card style={{ width: '18rem' }}>
        <Card.Body className="card-body">
          <Card.Title className="card-title">
            {workshops?.workshop_name}
          </Card.Title>
          <Card.Text className="card-text">
            <span>
              <strong>Descripción</strong>: {workshops?.description}
            </span>
            <span>
              <strong>Lugar</strong>: {workshops?.city}
            </span>
            <span>
              <strong>Fecha</strong>:{' '}
              {workshops?.workshop_start_date?.split('-').reverse().join('-')}
            </span>
            <span>
              <strong>Duración</strong>: {workshops?.duration}
            </span>
          </Card.Text>
          <div className="d-flex justify-content-center">
            <Button className="my-btn-card" onClick={() => setSelectedWorkshop(workshops)}>
              Inscribirme
            </Button>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};
