import './rates.css';
import whatsappIcon from '../../../assets/icons/whatsapp.svg';

const Rates = () => {
  return (
    <>
      <div className="page-hero">
        <h1>Asesoramiento gratuito</h1>
        <p>
          Cada familia es diferente, y el acompañamiento también. Cuéntame
          vuestra situación y encontramos juntos la opción que más os encaja.
        </p>
      </div>

      <div className="rates-content">
        <p className="rates-subtitle">
          Agenda tu sesión gratuita de asesoramiento a través de WhatsApp.
        </p>
        <a
          href="https://wa.me/34639943410?text=Hola%20Bel%C3%A9n%2C%20me%20gustar%C3%ADa%20saber%20m%C3%A1s%20sobre%20tus%20servicios%20y%20ver%20qu%C3%A9%20opci%C3%B3n%20encaja%20mejor%20con%20mi%20familia%20%F0%9F%98%8A"
          className="mail"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={whatsappIcon} alt="" className="imgWhatsapp" />
          <p>Agenda tu cita</p>
        </a>
      </div>
    </>
  );
};

export default Rates;
