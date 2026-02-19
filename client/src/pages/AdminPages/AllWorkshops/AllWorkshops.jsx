import { useContext, useEffect, useState } from "react"
import { fetchData } from "../../../helpers/axiosHelper";
import { AuthContext } from "../../../contexts/AuthContext/AuthContext";
import {Container, Row, Col} from 'react-bootstrap';
import './allWorkshops.css'


const AllWorkshops = () => {

  const [allWorkshops, setAllWorkshops] = useState([]);
  const {token} = useContext(AuthContext);

  useEffect(()=>{
    const fetchWorkshops = async() =>{
        try {
          const res = await fetchData('workshop/allWorkshops', 'GET', null, token);
          setAllWorkshops(res.data.result);
          console.log(res.data.result);
          
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