import {Form, Button} from 'react-bootstrap'
import './createWorkshops.css'
import { useContext, useState } from 'react';
import { workshopSchema } from '../../../schemas/WorkshopSchema';
import { ZodError } from 'zod';
import { useNavigate } from 'react-router';
import { fetchData } from '../../../helpers/axiosHelper';
import { AuthContext } from '../../../contexts/AuthContext/AuthContext';

const initialValues = {
  workshop_name:'',
  description: '',
  city:'',
  duration:'',
  workshop_start_date:'',
  workshop_end_date:''
}

const CreateWorkshops = () => {

  const [workshop, setWorkshop] = useState(initialValues);
  const [valErrors, setValErrors] = useState();
  const navigate = useNavigate();
  const {token} = useContext(AuthContext)

  const handleChange = (e) => {
    const {name, value} = e.target;
    setWorkshop({...workshop, [name]:value})
  }

  const onSubmit = async() => {
    try {
      workshopSchema.parse(workshop);
      let res = await fetchData('workshop/createWorkshop', 'POST', workshop, token);
      console.log(res);
      setWorkshop(initialValues);
      navigate('/admin/allWorkshops');
    } catch (error) {
        if(error instanceof ZodError){
          const fieldsErrors = {};
          error.issues.forEach((elem)=>{
            fieldsErrors[elem.path[0]] = elem.message;
          })
          setValErrors(fieldsErrors)
    }else{
      setValErrors({});
    }
  }
}
  
  return (
    <div className='my-form-workshops'>
      <div className='form-my'>
        <Form>
          <h2>Creación de Taller</h2>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Nombre</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Introduce el Nombre" 
              name='workshop_name'
              value={workshop.workshop_name}
              onChange={handleChange}/>
              {valErrors?.workshop_name && <p className='error-msg'>{valErrors.workshop_name}</p>}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCity">
            <Form.Label>Localización</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Introduce la Ciudad"
              name='city'
              value={workshop.city}
              onChange={handleChange} />
              {valErrors?.city && <p className='error-msg'>{valErrors.city}</p>}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicDuration">
            <Form.Label>Duración</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Introduzca Duración" 
              name='duration'
              value={workshop.duration}
              onChange={handleChange}/>
              {valErrors?.duration && <p className='error-msg'>{valErrors.duration}</p>}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicStartDate">
            <Form.Label>Fecha de Inicio</Form.Label>
            <Form.Control 
              type="date"
              name='workshop_start_date'
              value={workshop.workshop_start_date}
              onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEndDate">
            <Form.Label>Fecha de acabado</Form.Label>
            <Form.Control 
              type="date"
              name='workshop_end_date'
              value={workshop.workshop_end_date}
              onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicDescription">
            <Form.Label>Descripción</Form.Label>
            <Form.Control 
              type="description" 
              placeholder="Enter description"
              name='description'
              value={workshop.description}
              onChange={handleChange} />
              {valErrors?.description && <p className='error-msg'>{valErrors.description}</p>}
          </Form.Group>
          <div className='d-flex gap-3'>
            <Button className='my-btn' onClick={()=>navigate('/')}>
              Cancelar
            </Button>
            <Button className='my-btn' onClick={onSubmit}>
              Aceptar
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
;
}
export default CreateWorkshops;
