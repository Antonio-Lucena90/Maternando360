import { useEffect, useState } from "react"
import { fetchData } from "../../../helpers/axiosHelper";
import { AuthContext } from "../../../contexts/AuthContext/AuthContext";
import {Container, Row, Col, Button} from 'react-bootstrap';
import './allWorkshops.css'
import { useNavigate } from "react-router";


const AllWorkshops = () => {

  const [allWorkshops, setAllWorkshops] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    const fetchWorkshops = async() =>{
        try {
          const res = await fetchData('workshop/allWorkshops', 'GET');
          setAllWorkshops(res.data.result);
        } catch (error) {
          console.log(error);
          
        }
    }
    fetchWorkshops();
  }, [])

  return (
    <>
      <Container>
        <Row>
          <Col>
          <div className="div-ppal">
              {allWorkshops?.map((elem)=>{
                return(
                    <div key={elem.workshop_id} className="div-map">
                    <h2>Nombre: {elem.workshop_name}</h2>
                    <p>Duración: {elem.duration}</p>
                    <p>Ciudad: {elem.city}</p>
                    <p>Fecha de inicio: {elem.workshop_start_date}</p>
                    <p>Fecha final: {elem.workshop_end_date}</p>
                    <p>Descripción: {elem.description}</p>
                    <div className="d-flex gap-4">
                      <Button className="my-btn" onClick={()=>navigate(`/admin/editWorkshops/${elem.workshop_id}`)}>Editar</Button>
                      <Button className="my-btn">Eliminar</Button>
                    </div>
                    </div>
                )
              })}
              </div>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default AllWorkshops