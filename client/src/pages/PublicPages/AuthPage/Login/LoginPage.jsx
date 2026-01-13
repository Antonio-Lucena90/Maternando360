import React, { useContext, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router';
import './loginPage.css'
import { loginSchema } from '../../../../schemas/LoginSchema';
import { fetchData } from '../../../../helpers/axiosHelper';
import { ZodError } from 'zod';
import { AuthContext } from '../../../../contexts/AuthContext/AuthContext';


const initialValue = {
  email: '',
  password:''
}

const LoginPage = () => {
  const [login, setLogin] = useState(initialValue);
  const [valErrors, setValErrors] = useState();
  const [errorMsg, setErrorMsg] = useState('')
  
  const {setUser, setToken} = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e)=>{
    const {name, value} = e.target
    setLogin({...login, [name]:value}) 
  }

  const onSubmit = async()=>{
      try{
        //validar datos
        loginSchema.parse(login);
        //mandar datos
        const res = await fetchData('user/login', 'POST', login);
        const token = res.data.token;
        //guardo el token en el LS.
        //peticion para traerme los datos del usuario logueado, seguro por el token
        const resUser = await fetchData('user/oneUser', 'GET', null, token)
        console.log(resUser)
        localStorage.setItem('token', token); // solo se pueden guardar strings. 
        setUser(resUser.data.user)
        setToken(token)
      }catch(error){
        if(error instanceof ZodError){
          const fieldsErrors = {};
          error.issues.forEach((elem)=>{
            fieldsErrors[elem.path[0]] = elem.message;
          })
          setValErrors(fieldsErrors)
        }else{
          setErrorMsg(error.response.data.message);
        }
        
      }

  }

  return (
    <div className='login-ppal'>
      <Form className='my-form'>
        <h2>Formulario de Inicio de Sesión</h2>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Introduzca un Email"
            onChange={handleChange}
            name="email"
            value={login.email}
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
            value={login.password}
          />
          {valErrors?.password && <p className='error-msg'>{valErrors.password}</p>}
        </Form.Group>
        <p className='error-msg'>{errorMsg}</p>
        <div className='d-flex gap-3'>
          <Button className='my-btn' onClick={onSubmit}>Aceptar</Button>
          <Button onClick={()=>navigate(-1)} className='my-btn'>Cancelar</Button>
        </div>
        <Form.Text>
          ¿Aún no está Registrado? <Link to='/register'>Registro aquí</Link>
        </Form.Text>
      </Form>
    </div>
  );
};

export default LoginPage;
