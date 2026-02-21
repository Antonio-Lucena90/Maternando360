import cIcon from '../../assets/icons/c-circle.svg'
import instagramIcon from '../../assets/icons/instagram.svg'
import whatsappIcon from '../../assets/icons/whatsapp.svg'
import './footer.css'
import {Container, Row, Col} from 'react-bootstrap'

export const Footer = () => {
  return (
    <>
    <Container>
      <Row className='row'>
        <Col className='col1'>
          <img src={cIcon} alt="" />
          <p className='footer-p'>Maternando360</p>
        </Col>
        <Col className='col2'>
          <a 
            href="https://www.instagram.com/maternando360?igsh=NWl2OG1mcTdvNjNj"
            target='_blank'
            rel='noopener noreferrer'>
            <img src={instagramIcon} alt="" />
          </a>
          <img src={whatsappIcon} alt="" />
      </Col>
      </Row>
    </Container>
    </>
  )
}
