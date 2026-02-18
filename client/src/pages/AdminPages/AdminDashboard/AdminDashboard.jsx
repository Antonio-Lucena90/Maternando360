
import {Container, Col, Row} from 'react-bootstrap'
import './adminDashboard.css'
import uploadIcon from '../../../assets/icons/users.svg'
import uploadIcon2 from '../../../assets/icons/hammer.svg'
import { useNavigate } from 'react-router'

const AdminDashboard = () => {
  const navigate = useNavigate();
  return (
    <>
    <Container>
      <Row>
        <Col xs={4}>
          <div className='dashboard-Card' onClick={()=>navigate('/admin/allUsers')}>
            <img src={uploadIcon} className='img' alt="" />
            <p>Ver todos los Usuarios Registrados</p>
          </div>
        </Col>
        <Col xs={4}>
          <div className='dashboard-Card' onClick={()=>navigate('/admin/createWorkshops')}>
            <img src={uploadIcon2} className='img' alt="" />
            <p>Crear Nuevo Taller</p>
          </div>
        </Col>
      </Row>
    </Container>
    </>
  )
}

export default AdminDashboard