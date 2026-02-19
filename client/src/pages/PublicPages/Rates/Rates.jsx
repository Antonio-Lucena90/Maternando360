import './rates.css';
import { RatesInfo } from './RatesInfo';
import { Container, Row, Col } from 'react-bootstrap';

const Rates = ({ currentInfo, setCurrentInfo }) => {
  return (
    <section>
      <div className="title">
        <h2>Tarifas</h2>
        <h3>
          "Acompañar no es decir qué hacer. Es ayudar a entender, sostener y
          confiar.”
        </h3>
      </div>
      <div className="ppal-div">
        <Container>
          <Row>
            <Col md={6} className='d-flex justify-content-center align-items-center mb-4'>
              <div className="my-container">
                <h3>Asesoramiento Familiar Bebés 0-3años</h3>
                <button
                  onClick={() => setCurrentInfo(currentInfo === 1 ? null : 1)}
                >
                  Ver info
                </button>
                <RatesInfo currentInfo={currentInfo} id={1}>
                  <p>
                    Orientación en desarrollo infantil, regulación sensorial y
                    emocional, autonomía, alimentación, rutinas y descanso.
                  </p>
                  <table>
                    <tr>
                      <th>Modalidad</th>
                      <th>Duración</th>
                      <th>Precio</th>
                    </tr>
                    <tr>
                      <td>Online</td>
                      <td>45min</td>
                      <td>50€</td>
                    </tr>
                    <tr>
                      <td>Online</td>
                      <td>60min</td>
                      <td>60€</td>
                    </tr>
                    <tr>
                      <td>Presencial*</td>
                      <td>75min</td>
                      <td>75€</td>
                    </tr>
                  </table>
                  <p>
                    *Presencial: Precio según localización, puede incluir coste
                    de transporte.
                  </p>
                </RatesInfo>
              </div>
            </Col>
            <Col md={6} className='d-flex justify-content-center align-items-center mb-4'>
              <div className="my-container">
                <h3>Pack de Seguimiento Online</h3>
                <button
                  onClick={() => setCurrentInfo(currentInfo === 2 ? null : 2)}
                >
                  Ver info
                </button>
                <RatesInfo currentInfo={currentInfo} id={2}>
                  <p>
                    3 sesiones online (1ª sesión: 60 min + 2 seguimientos: 40
                    min). Acompañamiento progresivo para familias que necesitan
                    algo más que una sesión puntual.
                  </p>
                  <table>
                    <tr>
                      <th>Servicio</th>
                      <th>Contenido</th>
                      <th>Precio</th>
                    </tr>
                    <tr>
                      <td>Pack 3 sesiones</td>
                      <td>1x60min + 2x40min</td>
                      <td>140€</td>
                    </tr>
                  </table>
                </RatesInfo>
              </div>
            </Col>
            <Col md={6} className='d-flex justify-content-center align-items-center mb-4'>
              <div className="my-container">
                <h3>Neurodesarrollo y aprendizaje (3-10 años)</h3>
                <button
                  onClick={() => setCurrentInfo(currentInfo === 3 ? null : 3)}
                >
                  Ver info
                </button>
                <RatesInfo currentInfo={currentInfo} id={3}>
                  <p>
                    Para niños con dificultades de atención, regulación
                    emocional, aprendizaje, perfil sensorial, TEA, TD(H)A.
                  </p>
                  <table>
                    <tr>
                      <th>Servicio</th>
                      <th>Contenido</th>
                      <th>Precio</th>
                    </tr>
                    <tr>
                      <td>Sesión Individual</td>
                      <td>Online</td>
                      <td>60€</td>
                    </tr>
                    <tr>
                      <td>Pack Orientación</td>
                      <td>1x60min + 2x40min (2 semanas)</td>
                      <td>155€</td>
                    </tr>
                  </table>
                </RatesInfo>
              </div>
            </Col>
            <Col md={6} className='d-flex justify-content-center align-items-center mb-4'>
              <div className="my-container">
                <h3>Acompañamiento Individual Descanso y Sueño</h3>
                <button
                  onClick={() => setCurrentInfo(currentInfo === 4 ? null : 4)}
                >
                  Ver info
                </button>
                <RatesInfo currentInfo={currentInfo} id={4}>
                  <p>
                    Regulación neuro-sensorial aplicada al descanso. Un espacio
                    1:1 para resolver dudas sobre el descanso de tu hijo/a y tu
                    familia.
                  </p>
                  <table>
                    <tr>
                      <th>Modalidad</th>
                      <th>Duración</th>
                      <th>Precio</th>
                    </tr>
                    <tr>
                      <td>Online</td>
                      <td>45min</td>
                      <td>55€</td>
                    </tr>
                    <tr>
                      <td>Online </td>
                      <td>60min</td>
                      <td>65€</td>
                    </tr>
                    <tr>
                      <td>Presencial* </td>
                      <td>75min</td>
                      <td>80€</td>
                    </tr>
                  </table>
                  <p>
                    *Presencial: Precio según localización, puede incluir coste
                    de transporte.
                  </p>
                </RatesInfo>
              </div>
            </Col>
            <Col md={6} className='d-flex justify-content-center align-items-center mb-4'>
              <div className="my-container">
                <h3>Acompañamiento Fulltime Descanso y Sueño</h3>
                <button
                  onClick={() => setCurrentInfo(currentInfo === 5 ? null : 5)}
                >
                  Ver info
                </button>
                <RatesInfo currentInfo={currentInfo} id={5}>
                  <p>
                    Acompañamiento intensivo de 2 o 3 semanas con sesiones
                    online semanales según necesidad + resolución de dudas por
                    WhatsApp (lunes a viernes, 9:00-21:00). Ideal para momentos
                    de gran desregulación o etapas de cambio importantes.
                  </p>
                  <table>
                    <tr>
                      <th>Servicio</th>
                      <th>Duración</th>
                      <th>Precio</th>
                    </tr>
                    <tr>
                      <td>Acompañamiento Fulltime</td>
                      <td>2-3 Semanas, 2-3 Sesiones Online + WhatsApp</td>
                      <td>A consultar</td>
                    </tr>
                  </table>
                </RatesInfo>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </section>
  );
};

export default Rates;
