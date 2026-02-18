import './rates.css';
import { RatesInfo } from './RatesInfo';
import {Container, Row, Col} from 'react-bootstrap'

const Rates = ({ currentInfo, setCurrentInfo }) => {
  return (
    <section className="my-container">
      <div>
        <h2 className="text-center p-5">Tarifas</h2>
        <div className="table">
          <table>
            <tbody>
              <tr>
                <td>
                  <h3>Asesoramiento Familiar Bebés 0-3años</h3>
                  <button
                    onClick={() => setCurrentInfo(currentInfo === 1 ? null : 1)}
                  >
                    Ver info
                  </button>
                  <RatesInfo currentInfo={currentInfo} id={1}>
                    <Container>
                    <p>
                      Orientación en desarrollo infantil, regulación sensorial y
                      emocional, autonomía, alimentación, rutinas y descanso.
                    </p>
                    <div className="d-flex flex-column justify-content-center align-items-center">
                     <Row>
                        <Col>
                        Modalidad
                        </Col>
                        <Col>
                        Duración
                        </Col>
                        <Col>
                        Precio
                        </Col>
                     </Row>
                     <Row>
                      <Col>
                        Online
                      </Col>
                      <Col>
                        60min
                      </Col>
                      <Col>
                        50€
                      </Col>
                     </Row>
                    </div>
                    </Container>
                  </RatesInfo>
                </td>
              </tr>
            </tbody>
          </table>
          <table>
            <tbody>
              <tr>
                <td>
                  <h3>Asesoramiento Individual Presencial</h3>
                  <button
                    onClick={() => setCurrentInfo(currentInfo === 2 ? null : 2)}
                  >
                    Ver info
                  </button>
                  <RatesInfo currentInfo={currentInfo} id={2}>
                    <p>
                      Sesión presencial para familias que prefieren un
                      acompañamiento cercano y directo
                    </p>
                    <p>Indicada para:</p>
                    <div className="d-flex flex-column justify-content-center align-items-center">
                      <ul>
                        <li>Valoración más profunda del día a día familiar</li>
                        <li>Observación del niño en su entorno</li>
                        <li>
                          Acompañamiento en momentos de cambio o dificultad
                        </li>
                      </ul>
                    </div>
                    <h5>
                      Precio:
                      <p>65€ Sesión de 60 minutos</p>
                    </h5>
                  </RatesInfo>
                </td>
              </tr>
            </tbody>
          </table>
          <table>
            <tbody>
              <tr>
                <td>
                  <h3>Acompañamiento Familiar</h3>
                  <button
                    onClick={() => setCurrentInfo(currentInfo === 3 ? null : 3)}
                  >
                    Ver Info
                  </button>
                  <RatesInfo currentInfo={currentInfo} id={3}>
                    <p>
                      Pensado para familias que necesitan algo más que una
                      sesión puntual
                    </p>
                    <p>Este acompañamiento permite:</p>
                    <div className="d-flex flex-column justify-content-center align-items-center">
                      <ul>
                        <li>Comprender en profundidad que está pasando</li>
                        <li>Ajustar estrategias según la evolución del niño</li>
                        <li>Acompañar los cambios con mayor seguridad</li>
                      </ul>
                    </div>
                    <h5>
                      Precio:
                      <p>175€ 3 Sesiones OnLine</p>
                      <p>1ª Sesión de 60 minutos </p>
                      <p>2 sesiones de seguimiento de 40 minutos </p>
                    </h5>
                  </RatesInfo>
                </td>
              </tr>
            </tbody>
          </table>
          <table>
            <tbody>
              <tr>
                <td>
                  <h3>Acompañamiento FullTime</h3>
                  <button
                    onClick={() => setCurrentInfo(currentInfo === 4 ? null : 4)}
                  >
                    Ver info
                  </button>
                  <RatesInfo currentInfo={currentInfo} id={4}>
                    <p>
                      Un acompañamiento intensivo y cercano para familias que
                      necesiten sostén continuo.
                    </p>
                    <p>Incluye:</p>
                    <div className="d-flex flex-column justify-content-center align-items-center">
                      <ul>
                        <li>3 Sesiones On-Line personalizadas.</li>
                        <li>
                          Resolución de dudas por Whatsapp de lunes a viernes.
                        </li>
                        <li>Horario de contacto: 9:00-21:00.</li>
                      </ul>
                      <p>Ideal para:</p>
                    </div>
                    <div className="d-flex flex-column justify-content-center align-items-center">
                      <ul>
                        <li>Momentos de gran desregulación.</li>
                        <li>Dificultades en el descanso.</li>
                        <li>Etapas de cambios importantes.</li>
                        <li>
                          Familias que necesitan sentirse acompañadas en el día
                          a día.
                        </li>
                      </ul>
                    </div>
                    <h5>
                      Precio:
                      <p>495€ por 2 semanas</p>
                    </h5>
                  </RatesInfo>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <h2 className="text-center p-5">Tarifas de Cursos</h2>
        <div className="table">
          <table>
            <thead>
              <tr>
                <th>Tipo de Cursos</th>
                <th>Duración</th>
                <th>Precio</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Curso Presencial</td>
                <td>2 horas</td>
                <td>65€/persona</td>
              </tr>
              <tr>
                <td>Curso On-Line</td>
                <td>1 hora y 30 minutos</td>
                <td>55€/Persona</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <h2 className="text-center p-5">Tarifas de Talleres</h2>
        <div className="table">
          <table>
            <thead>
              <tr>
                <th>Tipo de Taller</th>
                <th>Duración</th>
                <th>Precio</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Taller Presencial</td>
                <td>60 minutos</td>
                <td>50€/Persona</td>
              </tr>
              <tr>
                <td>Taller On-Line</td>
                <td>60 minutos</td>
                <td>40€/Persona</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="cita">
        <h2>¿Cómo pedir cita o reservar tu Curso/Taller?</h2>
        <ol>
          <li>
            Envía un E-Mail a maternando@gmail.com y nos pondremos en contacto
            con usted.
          </li>
          <li>Realice el pago mediante Bizum.</li>
          <li>Recibirá un correo de confirmación.</li>
        </ol>
      </div>
      <div className="cancelacion">
        <h2>Política de Cancelación</h2>
        <ul>
          <li>Se podrá cambiar la cita hasta 24h antes sin costes.</li>
          <li>
            Cancelación con menos de 24h o ausencia sin aviso se considerará
            realizada.
          </li>
          <li>En caso de excepciones se reprogramará sin costes.</li>
        </ul>
      </div>
    </section>
  );
};

export default Rates;
