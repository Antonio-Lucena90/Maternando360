import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import {Link, useNavigate} from 'react-router'
import './registerPage.css'
import { registerSchema } from '../../../../schemas/RegisterSchema';
import { ZodError } from 'zod';
import { fetchData } from '../../../../helpers/axiosHelper';

const initialValue = {
  name:'',
  last_name:'',
  phone:'',
  birth_date:'',
  email:'',
  password:'',
  confirm_password:''
}

const RegisterPage = () => {
  const [register, setRegister] = useState(initialValue);
  const [valErrors, setValErrors] = useState();
  const [fecthError, setFecthError] = useState('')

  const navigate = useNavigate()
  
  const handleChange = (e)=>{
    const {name, value} = e.target;
    setRegister({...register, [name]:value})
  }

  const onSubmit = async()=>{
    //validar campos
    try{
      registerSchema.parse(register)
      //mandar datos al back
      const res = await fetchData('user/register', 'POST', register)
      console.log(res);
      
      
      
      navigate('/login')
    }catch(error){
      if(error instanceof ZodError){
        const fieldsErrors = {};
        error.issues.forEach((elem)=>{
          fieldsErrors[elem.path[0]] = elem.message
        })
        setValErrors(fieldsErrors) 
      }else{
        setValErrors({});
        if(error.response.data.errno === 1062){
          setFecthError('El Email ya existe')
        }else{
        setFecthError('Ups, hay un error');
        }
      }
    }
  }

  return (
    <div className="register-ppal">
      <Form className="my-form">
        <h2>Formulario de Registro</h2>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Introduzca su nombre"
            onChange={handleChange}
            name="name"
            value={register.name}
          />
         {valErrors?.name && <p className='error-msg'>{valErrors.name}</p>}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicLastName">
          <Form.Label>Apellidos</Form.Label>
          <Form.Control
            type="text"
            placeholder="Introduzca sus apellidos"
            onChange={handleChange}
            name="last_name"
            value={register.last_name}
          />
          {valErrors?.last_name && <p className='error-msg'>{valErrors.last_name}</p>}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicLastName">
          <Form.Label>Teléfono</Form.Label>
          <Form.Control
            type="text"
            placeholder="Introduzca su teléfono"
            onChange={handleChange}
            name="phone"
            value={register.phone}
          />
          {valErrors?.phone && <p className='error-msg'>{valErrors.phone}</p>}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicLastName">
          <Form.Label>Fecha de Nacimiento</Form.Label>
          <Form.Control
            type="date"
            placeholder="Introduzca su fecha de Nacimiento"
            onChange={handleChange}
            name="birth_date"
            value={register.birth_date}
          />
          {valErrors?.birth_date && <p className='error-msg'>{valErrors.birth_date}</p>}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Introduzca un Email"
            onChange={handleChange}
            name="email"
            value={register.email}
          />
          {valErrors?.email && <p className='error-msg'>{valErrors.email}</p>}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Introduzca contraseña"
            onChange={handleChange}
            name="password"
            value={register.password}
          />
        {valErrors?.password && <p className='error-msg'>{valErrors.password}</p>}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
          <Form.Label>Confirme Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Introduzca contraseña"
            onChange={handleChange}
            name="confirm_password"
            value={register.confirm_password}
          />
        {valErrors?.confirm_password && <p className='error-msg'>{valErrors.confirm_password}</p>}
        </Form.Group>
        <div className="d-flex gap-3">
          <Button 
            variant="primary"
            className='my-btn'
            onClick={onSubmit}>
            Aceptar
          </Button>
          <Button
            className="my-btn"
            variant="primary"
            onClick={() => navigate(-1)}
          >
            Cancelar
          </Button>
        </div>
        <p className='error-msg'>{fecthError}</p>
        <Form.Text>
          ¿Está ya registrado?<Link to="/login">Login aquí</Link>
        </Form.Text>
      </Form>
    </div>
  );
};

export default RegisterPage;
