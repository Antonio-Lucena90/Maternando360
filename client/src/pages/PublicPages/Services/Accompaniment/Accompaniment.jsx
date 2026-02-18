import { useState } from 'react';
import './accompaniment.css';
import { Button } from 'react-bootstrap';
import { AccompanimentInfo } from './AccompanimentInfo';

const Accompaniment = () => {
  const [currentInfo, setCurrentInfo] = useState(null);

  return (
    <>
      <div className="ppal-div">
        <div>
          <h2>Acompañamiento a familias con hijos de 0 a 12 años</h2>
          <p>
            Acompaño a bebes, niños y familias en las diferentes etapas del
            desarrollo infantil, desde una mirada global, respetuosa y basada en
            evidencia, acompañando en el desarrollo infantil, el descanso, la
            regulación emocional y sensorial, así como en dificultades de
            atención, aprendizaje y adaptación escolar, incluyendo perfiles TEA
            y TDAH.
          </p>
        </div>
      </div>
      <div className="btn-div">
        <Button onClick={() => setCurrentInfo(currentInfo === 1 ? null : 1)}>
          Áreas de Acompañamiento
        </Button>
        <Button onClick={() => setCurrentInfo(currentInfo === 2 ? null : 2)}>
          Objetivos
        </Button>
        <Button onClick={() => setCurrentInfo(currentInfo === 3 ? null : 3)}>
          Incluye
        </Button>
      </div>
        <AccompanimentInfo currentInfo={currentInfo} id={1}>
          <div className='info-div'>
            <h3>Áreas de acompañamiento:</h3>
            <ul>
              <li>Orientación sobre desarrollo infantil</li>
              <li>Alimentación en la infancia</li>
              <li>Apoyo en la autonomía, adaptado a la etapa de desarrollo </li>
              <li>Regulación sensorial y emocional </li>
              <li>
                Acompañamiento a familias en momentos de duda, cambio o
                dificultad{' '}
              </li>
              <li>TEA</li>
              <li>TDAH / TDH </li>
              <li>Dificultades de atención y concentración</li>
              <li>Dificultades en funciones ejecutivas</li>
              <li>Dificultades de escritura (grafomotricidad, disgrafía) </li>
              <li>
                Dificultades en el entorno escolar (organización, conducta,
                regulación emocional)
              </li>
            </ul>
          </div>
        </AccompanimentInfo>
        <AccompanimentInfo currentInfo={currentInfo} id={2}>
          <div className='info-div'>
            <h3>Objetivo del acompañamiento </h3>
            <p>
              Mi objetivo es ayudarte a entender las necesidades de tu hijo/a
              según su etapa de desarrollo.
            </p>
            <p>Cuando comprendemos qué está pasando y por qué, podemos:</p>
            <ul>
              <li>responder con mayor calma, </li>
              <li>ofrecer un apoyo ajustado y realista,</li>
              <li>y tomar decisiones más seguras en el día a día. </li>
            </ul>
            <p>
              Trabajo desde un enfoque que busca empoderar a las familias, para
              que no dependan de pautas externas constantes, sino que puedan
              comprender, observar y adaptar la crianza a su propia realidad
              familiar.
            </p>
            <p>El acompañamiento combina:</p>
            <ul>
              <li>evidencia científica, </li>
              <li>mirada profesional desde la Terapia Ocupacional, </li>
              <li>y mi experiencia personal como madre. </li>
            </ul>
            <p>
              Siempre desde una perspectiva humana, holística y práctica, con
              estrategias respetuosas y sostenibles que puedan aplicarse desde el
              primer día.
            </p>
            <p className='p-p'>
              “No se trata de corregir ni acelerar la evolución de nuestros hijos,
              sino de comprender, adaptarnos a sus necesidades y avanzar juntos
              como familia.”
            </p>
          </div>
        </AccompanimentInfo>
        <AccompanimentInfo currentInfo={currentInfo} id={3}>
          <div className='info-div'>
            <h3>Incluye:</h3>
            <h4>Valoración inicial integral</h4>
            <ul>
              <li>Entrevista familiar </li>
              <li>Observación del niño/a </li>
              <li>Perfil sensorial </li>
              <li>Análisis de rutinas (hogar y escuela) </li>
              <li>Detección de fortalezas y necesidades </li>
            </ul>
            <h4>Intervención individualizada, trabajo en:</h4>
            <ul>
              <li>atención y concentración</li>
              <li>autorregulación emocional </li>
              <li>organización y planificación </li>
              <li>habilidades escolares funcionales </li>
            </ul>
            <p>Estrategias basadas en:</p>
            <ul>
              <li>integración sensorial </li>
              <li>juego terapéutico</li>
              <li>rutinas estructuradas</li>
            </ul>
            <h4>Acompañamiento escolar si precisa.</h4>
            <p>Orientación a familias para:</p>
            <ul>
              <li>deberes </li>
              <li>tiempos de estudio</li>
              <li>adaptación del entorno </li>
              <li>Estrategias para el aula (para padres y docentes) </li>
              <li>
                Comunicación con el centro escolar (si la familia lo desea){' '}
              </li>
            </ul>
            <h4>Acompañamiento a familias</h4>
            <ul>
              <li>Educación y comprensión del perfil del niño</li>
              <li>Estrategias prácticas para el día a día</li>
              <li>Gestión de conductas difíciles</li>
              <li>Regulación emocional familiar </li>
            </ul>
          </div>
        </AccompanimentInfo>
    </>
  );
};

export default Accompaniment;
