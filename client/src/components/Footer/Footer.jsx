import cIcon from '../../assets/icons/c-circle.svg'
import instagramIcon from '../../assets/icons/instagram.svg'
import whatsappIcon from '../../assets/icons/whatsapp.svg'
import gitIcon from '../../assets/icons/github.svg'
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
          <a href="https://chat.whatsapp.com/Foq253iM84W75fgawRMuuv?mode=gi_t"  
                target='_blank'
                rel='noopener noreferrer'>
          <img src={whatsappIcon} alt="" />
          </a>
      </Col>
      </Row>
      <Row>
        <Col className='col2'>
          <p><img src={cIcon} alt="" /> 2026 Maternando360. Web desarrollada por Antonio Lucena.</p>
          <a href="https://github.com/Antonio-Lucena90?tab=repositories" className='d-flex'>
          <p>Más en: </p>
          <img src={gitIcon} alt="" className='mb-4' />
          </a>
        </Col>
      </Row>
    </Container>
    </>
  )
}
