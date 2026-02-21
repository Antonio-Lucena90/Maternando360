import { Form, Button } from 'react-bootstrap'
import './editWorkshop.css'
import { useContext, useState } from 'react'
import { AuthContext } from '../../../contexts/AuthContext/AuthContext'
import { useNavigate, useParams } from 'react-router'
/* import { workshopSchema } from '../../../schemas/WorkshopSchema' */
import { fetchData } from '../../../helpers/axiosHelper'

const EditWorkshop = () => {
  const {id} = useParams();
  const {workshops, setWorkshops, token} = useContext(AuthContext);
  console.log(workshops);
  
  const selectedWorkshop = workshops?.find((e)=> e.workshop_id === Number(id));
  const [editWorkshop, setEditWorkshop] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const {name, value} = e.target;
    setEditWorkshop({...editWorkshop, [name]:value})
  }

  const onSubmit = async()=>{
      try {
        let res = await fetchData(`workshop/editWorkshop/${selectedWorkshop.workshop_id}`, 'PUT', editWorkshop, token);
        console.log(res);
        setWorkshops((workshops)=>{
          return workshops.map((elem)=>{
            if(elem.workshop_id === selectedWorkshop.workshop_id){
              return {...elem, editWorkshop};
            }else{
              return elem;
            }
          })
        });
      } catch (error) {
        console.log(error);
      }
  }

  return (
    <>
       <div className='my-form-workshops'>
      <div className='form-my'>
        <Form>
          <h2>Creación de Taller</h2>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Nombre</Form.Label>
            <Form.Control 
              type="text" 
              name='workshop_name'
              value={editWorkshop?.workshop_name ?? selectedWorkshop?.workshop_name}
              onChange={handleChange}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCity">
            <Form.Label>Localización</Form.Label>
            <Form.Control 
              type="text" 
              name='city'
              value={editWorkshop?.city ?? selectedWorkshop?.city}
              onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicDuration">
            <Form.Label>Duración</Form.Label>
            <Form.Control 
              type="text" 
              name='duration'
              value={editWorkshop?.duration ?? selectedWorkshop?.duration}
              onChange={handleChange}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicStartDate">
            <Form.Label>Fecha de Inicio</Form.Label>
            <Form.Control 
              type="date"
              name='workshop_start_date'
              value={editWorkshop?.workshop_start_date ?? selectedWorkshop?.workshop_start_date ?? ''}
              onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEndDate">
            <Form.Label>Fecha de acabado</Form.Label>
            <Form.Control 
              type="date"
              name='workshop_end_date'
              value={editWorkshop?.workshop_end_date ?? selectedWorkshop?.workshop_end_date}
              onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicDescription">
            <Form.Label>Descripción</Form.Label>
            <Form.Control 
              type="description" 
              name='description'
              value={editWorkshop?.description ?? selectedWorkshop?.description}
              onChange={handleChange} />
          </Form.Group>
          <div className='d-flex gap-3'>
            <Button className='my-btn' onClick={()=>navigate(-1)}>
              Cancelar
            </Button>
            <Button className='my-btn' onClick={onSubmit}>
              Aceptar
            </Button>
          </div>
        </Form>
      </div>
    </div>
    </>
  )
}

export default EditWorkshop