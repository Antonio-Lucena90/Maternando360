import { Col, Container, Row } from 'react-bootstrap';
import './aboutPage.css'

const AboutPage = () => {
  return (
    <>
     
        <Row>
          <h2>¿Quién soy?</h2>
          <Col xs={10} className='my-col'>    
              <div className='about'>
                <p>
                  Detrás de Maternando360 está Belén, terapeuta
                  ocupacional especializada en infancia, desarrollo infantil e
                  integración sensorial. Pero sobre todo, soy mamá de mellizos.
                </p>
              </div>
              <div className='about'>
                <p>
                  Mi
                  maternidad empezó mucho antes de tener a mis bebés, y puedo decir
                  que ha transformado mi vida y mi mirada profesional. Me ha llevado
                  a situaciones retantes, enfrentándome a mis propias necesidades, y
                  dándome la oportunidad de integrar mis conocimientos teóricos en
                  mi día a día como madre, aplicando la evidencia científica y la
                  práctica real de la maternidad en primera persona. De esa
                  experiencia nace la necesidad de compartir tanto mis conocimientos
                  profesionales como mis aprendizajes como mamá con otras madres y
                  familias.
                </p>
              </div>
              <div className='about'>
                  <h3>Así nace Maternando360.</h3>
                <p>
                  Un espacio para acompañar a la
                  mujer y a su familia en su ma/paternidad, donde acompaño a
                  familias con hijos de 0 a 12 años a comprender qué está ocurriendo
                  en cada etapa del desarrollo. Como dice la psiquiatra Marian Rojas
                  Estapé, "comprender es aliviar".
                </p>
              </div> 
              <div className='about'>
                <p>
                  Para mí, entender el desarrollo
                  de nuestros hijos y el "por qué" de lo que ocurre nos ayuda a
                  actuar desde la calma y la seguridad, no desde la culpa o la duda.
                  Me gusta trabajar desde un enfoque integral y holístico que
                  respeta el ritmo del desarrollo neurológico de cada niño y su
                  relación e interacción con el entorno. No se trata de corregir,
                  sino de entender. No de establecer fórmulas rígidas, sino de crear
                  estrategias realistas, sostenibles y respetuosas con y para cada
                  familia.
                </p>
              </div>
              <div className='about'>
                <p>
                  Mi objetivo es que entiendas las necesidades de tu hijo/a
                  y que te sientas acompañada, empoderada y tranquila en tu manera
                  de criar. La crianza no es perfecta, es consciente. Y cuando hay
                  comprensión, hay calma. Y la calma genera equilibrio y bienestar
                  familiar a todos los niveles.
                </p>
              </div>
          </Col>
        </Row>
    </>
  );
};

export default AboutPage;
