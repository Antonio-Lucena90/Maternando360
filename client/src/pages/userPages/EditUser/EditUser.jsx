import React, { useContext, useState} from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { AuthContext } from '../../../contexts/AuthContext/AuthContext';
import { editSchema } from '../../../schemas/EditSchema';
import { fetchData } from '../../../helpers/axiosHelper';
import { useNavigate } from 'react-router';

const EditUser = () => {
  const { user, setUser, token} = useContext(AuthContext)
  const [editUser, setEditUser] = useState(user);

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditUser({ ...editUser, [name]: value });
  };

  const onSubmit = async() =>{
    try{
      editSchema.parse(editUser)
      let res = await fetchData('user/editUser', 'PUT', editUser, token)
      console.log(res);
      setUser(editUser)
      navigate('/profile') 
    }catch(error){
      console.log(error);
      
    }
  }


  return (
    <>
      <Container>
        <Row className='d-flex justify-content-center align-items-center p-5'>
          <Col xs={4}>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Introduzca nombre"
                  name="name"
                  value={editUser?.name}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Apellidos</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Introduzca apellidos"
                  name="last_name"
                  value={editUser?.last_name? editUser?.last_name:''}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Teléfono</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Introduzca Teléfono"
                  name="phone"
                  value={editUser?.phone? editUser?.phone:''}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Fecha de Nacimiento</Form.Label>
                <Form.Control
                  type="date"
                  name="birth_date"
                  value={editUser?.birth_date? editUser?.birth_date:''}
                  onChange={handleChange}
                />
              </Form.Group>
              <div className='d-flex gap-3'>
                <Button variant="primary" onClick={onSubmit}>Aceptar</Button>
                <Button 
                  variant="primary" 
                  onClick={()=>navigate('/profile')}>
                    Cancelar</Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default EditUser;
