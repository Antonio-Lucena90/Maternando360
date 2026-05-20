import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, getDay, parse, startOfWeek } from 'date-fns';
import { es } from 'date-fns/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './dreamRegister.css';
import { AuthContext } from '../../../contexts/AuthContext/AuthContext';
import { fetchData } from '../../../helpers/axiosHelper';

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales: { es }
});

const messages = {
  month: 'Mes', week: 'Semana', day: 'Día', today: 'Hoy',
  previous: '‹', next: '›', noEventsInRange: 'Sin registros'
};

const toInputTime = (timeStr) => timeStr?.slice(0, 5) ?? '';

function DreamRegister() {
  const { token } = useContext(AuthContext);
  const [records, setRecords] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  const loadRecords = async () => {
    try {
      const res = await fetchData('user/sleep', 'GET', null, token);
      setRecords(res.data.result);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!token) return;
    const fetchRecords = async () => {
      try {
        const res = await fetchData('user/sleep', 'GET', null, token);
        setRecords(res.data.result);
      } catch (err) {
        console.log(err);
      }
    };
    fetchRecords();
  }, [token]);

  const handleSelectSlot = useCallback(({ start }) => {
    setSelectedDate(start);
    setStartTime('');
    setEndTime('');
    setComment('');
    setError('');
  }, []);

  const handleNavigate = useCallback((date) => {
    setCurrentDate(date);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!startTime || !endTime) return setError('Indica la hora de inicio y fin');
    if (startTime >= endTime) return setError('La hora de fin debe ser posterior a la de inicio');

    const sleep_date = format(selectedDate, 'yyyy-MM-dd');
    try {
      await fetchData('user/sleep', 'POST', { sleep_date, start_time: startTime, end_time: endTime, comment }, token);
      setStartTime('');
      setEndTime('');
      setComment('');
      setError('');
      loadRecords();
    } catch (err) {
      setError(err.response?.data?.message || 'Error al guardar');
    }
  };

  const handleDelete = async (record_id) => {
    try {
      await fetchData(`user/sleep/${record_id}`, 'DELETE', null, token);
      loadRecords();
    } catch (err) {
      console.log(err);
    }
  };

  const events = records.map((r) => {
    const dateStr = r.sleep_date.slice(0, 10);
    return {
      id: r.record_id,
      title: `${toInputTime(r.start_time)} – ${toInputTime(r.end_time)}`,
      start: new Date(`${dateStr}T${r.start_time}`),
      end: new Date(`${dateStr}T${r.end_time}`)
    };
  });

  const selectedDateStr = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : null;
  const dayRecords = records.filter((r) => r.sleep_date.slice(0, 10) === selectedDateStr);

  const totalMinutes = dayRecords.reduce((acc, r) => {
    const [sh, sm] = r.start_time.split(':').map(Number);
    const [eh, em] = r.end_time.split(':').map(Number);
    return acc + (eh * 60 + em) - (sh * 60 + sm);
  }, 0);

  return (
    <div className="dream-container">
      <h2>Registro de sueño</h2>
      <p className="dream-subtitle">Haz clic en un día para registrar las horas de sueño</p>

      <div className="dream-calendar-wrapper">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 480 }}
          selectable
          longPressThreshold={10}
          onSelectSlot={handleSelectSlot}
          date={currentDate}
          onNavigate={handleNavigate}
          culture="es"
          messages={messages}
          views={['month']}
        />
      </div>

      {selectedDate && (
        <div className="dream-day-panel">
          <p className="dream-day-title">
            {format(selectedDate, 'EEEE d MMMM yyyy', { locale: es })}
            {totalMinutes > 0 && (
              <span className="dream-total">
                — Total: {Math.floor(totalMinutes / 60)}h {totalMinutes % 60}min
              </span>
            )}
          </p>

          {dayRecords.length > 0 && (
            <ul className="dream-record-list">
              {dayRecords.map((r) => (
                <li key={r.record_id} className="dream-record-item">
                  <div className="dream-record-body">
                    <span className="dream-record-time">
                      {toInputTime(r.start_time)} → {toInputTime(r.end_time)}
                      {r.comment && <span className="dream-record-comment"> · {r.comment}</span>}
                    </span>
                    {r.admin_reply && (
                      <div className="dream-admin-reply">
                        <span className="dream-admin-reply-label">Respuesta:</span>
                        <span>{r.admin_reply}</span>
                      </div>
                    )}
                  </div>
                  <button className="btn-dream-delete" onClick={() => handleDelete(r.record_id)}>
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
          )}

          <form onSubmit={handleSubmit} className="dream-form">
            <div className="dream-form-group">
              <label>Hora inicio</label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
            <div className="dream-form-group">
              <label>Hora fin</label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
            <div className="dream-form-group">
              <label>Comentario (opcional)</label>
              <textarea
                className="dream-comment-input"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Añade algo que quieras compartir"
                maxLength={500}
                rows={2}
              />
            </div>
            <button type="submit" className="btn-dream-primary">
              Añadir registro
            </button>
          </form>

          {error && <p className="dream-error">{error}</p>}
        </div>
      )}
    </div>
  );
}

export default DreamRegister;
