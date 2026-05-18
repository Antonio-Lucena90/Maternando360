import { Container } from 'react-bootstrap'
import './adminDashboard.css'
import uploadIcon from '../../../assets/icons/users.svg'
import uploadIcon2 from '../../../assets/icons/hammer.svg'
import docuIcon from '../../../assets/icons/docu.svg'
import calendarIcon from '../../../assets/icons/calendar.svg'
import { useNavigate } from 'react-router'

const AdminDashboard = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <div className="admin-dashboard-grid">
        <div className='dashboard-Card' onClick={() => navigate('/admin/allUsers')}>
          <img src={uploadIcon} className='dashboard-icon' alt="" />
          <p>Ver todos los Usuarios Registrados</p>
        </div>
        <div className='dashboard-Card' onClick={() => navigate('/admin/createWorkshops')}>
          <img src={uploadIcon2} className='dashboard-icon' alt="" />
          <p>Crear Nuevo Taller</p>
        </div>
        <div className='dashboard-Card' onClick={() => navigate('/admin/documents')}>
          <img src={docuIcon} className='dashboard-icon' alt="" />
          <p>Gestionar Documentos</p>
        </div>
        <div className='dashboard-Card' onClick={() => navigate('/admin/inviteCodes')}>
          <img src={calendarIcon} className='dashboard-icon' alt="" />
          <p>Códigos de Invitación</p>
        </div>
      </div>
    </Container>
  )
}

export default AdminDashboard
