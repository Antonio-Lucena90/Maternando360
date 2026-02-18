import logo from '../../../assets/images/logo.png';
import { Container, Row, Col, Modal, Button } from 'react-bootstrap';
import './home.css';
import { useState } from 'react';
import { ZodError } from 'zod';
import { fetchData } from '../../../helpers/axiosHelper';
import { newsletterSchema } from '../../../schemas/NewsletterSchema';

const Home = () => {

  const [showModal, setShowModal] = useState(true);
  const [inputEmail, setInputEmail] = useState('');
  const [valErrors, setValErrors] = useState();

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
  
  return (
    <>
      <h1 className="title">
        <img src={logo} alt="" />
      </h1>
      <Container>
        <Row>
          <Col>
            <h2>Próximos Cursos</h2>
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
