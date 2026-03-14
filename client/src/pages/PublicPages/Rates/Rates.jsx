import './rates.css';
import whatsappIcon from '../../../assets/icons/whatsapp.svg';
import { Container, Row, Col } from 'react-bootstrap';

const Rates = () => {
  return (
    <section>
      <div className="title">
        <h1>Asesoramiento gratuito</h1>
        <h3>
          Cada familia es diferente, y el acompañamiento también. Cuéntame
          vuestra situación y encontramos juntos la opción que más os encaja.
        </h3>
        <h4>Agenda tu sesión gratuita de asesoramiento con este enlace.</h4>
      </div>
      <div className="ppal-div">
        <Container>
          <Row>
            <Col
              md={6}
              className="d-flex justify-content-center align-items-center mb-4"
            >
              <a
                href="https://wa.me/34639943410?text=Hola%20Bel%C3%A9n%2C%20me%20gustar%C3%ADa%20saber%20m%C3%A1s%20sobre%20tus%20servicios%20y%20ver%20qu%C3%A9%20opci%C3%B3n%20encaja%20mejor%20con%20mi%20familia%20%F0%9F%98%8A"
                className="mail"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="d-flex gap-3">
                  <img src={whatsappIcon} alt="" className='imgWhatsapp'/>
                  <p className="mt-3">Agenda tu cita</p>
                </div>
              </a>
            </Col>
          </Row>
        </Container>
      </div>
    </section>
  );
};

export default Rates;
