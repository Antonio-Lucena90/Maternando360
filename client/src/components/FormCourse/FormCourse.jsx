import React from 'react'
import { Button, Form } from 'react-bootstrap'

export const FormCourse = ({setShowFormCourse}) => {

  return (
    <div>
      <Form>
        <h2>Formulario de Cursos</h2>
      <Form.Group className="mb-3">
        <Form.Label>Título</Form.Label>
        <Form.Control type="text" placeholder="Enter title" />
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>Área</Form.Label>
        <Form.Control type="text" placeholder="Enter country" />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Fecha</Form.Label>
        <Form.Control type="text" placeholder="Enter city" />
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>Método</Form.Label>
        <Form.Control type="text" placeholder="Enter description" />
      </Form.Group>

      <div className='d-flex gap-3'>
        <Button variant="primary" >
          Submit
        </Button>
        <Button
          variant="primary"
          onClick={()=>setShowFormCourse(false)} >
          Cancel
        </Button>
      </div>
    </Form>
    </div>
  )
}
