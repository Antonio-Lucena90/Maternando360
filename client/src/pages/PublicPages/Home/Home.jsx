
import { Container, Row, Col, Modal, Button } from 'react-bootstrap';
import './home.css';
import { useEffect, useState } from 'react';
import { ZodError } from 'zod';
import { fetchData } from '../../../helpers/axiosHelper';
import { newsletterSchema } from '../../../schemas/NewsletterSchema';
import whatsappIcon from '../../../assets/icons/whatsapp.svg'

const Home = () => {

  const [showModal, setShowModal] = useState(true);
  const [inputEmail, setInputEmail] = useState('');
  const [valErrors, setValErrors] = useState();
  const [workshops, setWorkshops] = useState([]);

  const handleClose = () => {
    setShowModal(false); 
  }

  const handleChange = (e) => {
    setInputEmail(e.target.value)
  }

  const onSubmit = async () => {
    try {
      newsletterSchema.parse({email: inputEmail});
      let res = await fetchData('user/newsletter', 'POST', {email: inputEmail});
      console.log(res);
      setInputEmail('');
      setShowModal(false);
    } catch (error) {
      if(error instanceof ZodError){
        const fieldsErrors = {};
        error.issues.forEach((elem)=>{
          fieldsErrors[elem.path[0]] = elem.message;
        })
        setValErrors(fieldsErrors);
      }else{
        console.log(error);
        ;
      }
    }
  }

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
  const comingWorkshops = workshops.filter(e => {
    return new Date(e.workshop_start_date) >= today
  });

  const comingWorkshopsSort = comingWorkshops.sort((a,b)=>{
    return new Date(a.workshop_start_date) - new Date(b.workshop_start_date);
  }); 
  
  return (
    <>
      <h1 className="title">
        MATERNANDO360
      </h1>
      <Container>
        <Row>
          <Col className='d-flex flex-column justify-content-center align-items-center'>
            <h2>Próximos Talleres</h2>
            <div className='div-ppal-workshops'>
              {comingWorkshopsSort.map((elem,idx)=>{
                return(
                  <div key={idx} className='div-map'>
                    <p>{elem.workshop_name}</p>
                    <p>Lugar: {elem.city}</p>
                    <p>Fecha: {elem.workshop_start_date.split('-').reverse().join('-')}</p>
                  </div>  
                )
              })}
            </div>
          </Col>
          <Col className='d-flex flex-column justify-content-center align-items-center gap-4'>
            <h2>Contacta con Nosotros</h2>
            <p>Si tiene alguna pregunta, no dude en contactar con nosotros a través de nuestro Email</p>
            <div>
              <a href='mailto:lucenacalderon90@outlook.es' className='mail'>
                Contacte con nosotros
              </a>
            </div>
            <div className='d-flex flex-column justify-content-center align-items-center'>
              <h2>Únete a nuestra Comunidad de Whatsapp</h2>
              <p>Información y contacto directo a través de esta Comunidad</p>
              <a href="https://chat.whatsapp.com/Foq253iM84W75fgawRMuuv?mode=gi_t" 
                className='mail' 
                target='_blank'
                rel='noopener noreferrer'>
                <div className='d-flex gap-3'>
                  <img src={whatsappIcon} alt="" />
                  <p className='mt-3'>Únete a la Comunidad</p>
                </div>
              </a>
            </div>
          </Col>
        </Row>
      </Container>
      <div>
        <Modal
          show={showModal}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton className='modal-header'>
            <Modal.Title>¿Quieres mantenerte informado?</Modal.Title>
          </Modal.Header>
          <Modal.Body className='modal-body'>
            <p>Suscríbete a nuestra Newsletter para ser la primera en conocer nuevos Talleres, Cursos e información muy valiosa.</p>
            <p>Para ello envía tu Email:</p>
            <input 
              type="email"
              className='input-newsletter'
              placeholder='Introduce tu Email'
              name='email'
              onChange={handleChange}
              value={inputEmail}
               />
               {valErrors?.email && <p className='error-msg'>{valErrors.email}</p>}
          </Modal.Body>
          <Modal.Footer className='modal-footer'>
            <Button className='my-btn' onClick={handleClose}>
              Cancelar
            </Button>
            <Button className='my-btn' onClick={onSubmit}>Suscribirse</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default Home;
