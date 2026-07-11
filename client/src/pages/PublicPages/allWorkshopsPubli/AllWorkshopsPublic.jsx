import React, { useEffect, useState } from 'react'
import { fetchData } from '../../../helpers/axiosHelper';
import './allWorkshopsPublic.css'

const AllWorkshopsPublic = () => {
  const [workshops, setWorkshops] = useState([]);

  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        let res = await fetchData('workshop/allWorkshops', 'GET');
        setWorkshops(res.data.result);
      } catch (error) {
        console.log(error);
      }
    }
    fetchWorkshops();
  }, []);

  const today = new Date();
  const comingWorkshops = workshops
    .filter(e => new Date(e.workshop_start_date) >= today)
    .sort((a, b) => new Date(a.workshop_start_date) - new Date(b.workshop_start_date));

  return (
    <>
      <div className="page-hero">
        <h1>Próximos Talleres</h1>
        <p>Aprendizaje y acompañamiento en grupo. Plazas limitadas.</p>
      </div>

      <div className="workshops-list">
        {comingWorkshops.length === 0 && (
          <p className="workshops-empty">Próximamente nuevos talleres. ¡Mantente atenta!</p>
        )}
        {comingWorkshops.map((elem, idx) => {
          const date = new Date(elem.workshop_start_date);
          const day = date.toLocaleDateString('es-ES', { day: '2-digit' });
          const month = date.toLocaleDateString('es-ES', { month: 'short' });
          const year = date.toLocaleDateString('es-ES', { year: 'numeric' });

          return (
            <div key={idx} className="workshop-row">
              <div className="workshop-date">
                <span className="workshop-date__day">{day}</span>
                <span className="workshop-date__month">{month}</span>
                <span className="workshop-date__year">{year}</span>
              </div>
              <div className="workshop-body">
                <h3 className="workshop-name">{elem.workshop_name}</h3>
                <p className="workshop-description">{elem.description}</p>
                <div className="workshop-meta">
                  {elem.city && <span>📍 {elem.city}</span>}
                  {elem.duration && <span>⏱ {elem.duration}</span>}
                </div>
              </div>
              <div className="workshop-price">
                <span className="workshop-price__amount">{elem.price} €</span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default AllWorkshopsPublic
