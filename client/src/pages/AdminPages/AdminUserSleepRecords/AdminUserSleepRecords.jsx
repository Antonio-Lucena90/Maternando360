import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, getDay, parse, startOfWeek } from 'date-fns';
import { es } from 'date-fns/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './adminUserSleepRecords.css';
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

function AdminUserSleepRecords() {
  const { user_id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const [records, setRecords] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [replies, setReplies] = useState({});
  const [savingId, setSavingId] = useState(null);
  const [savedId, setSavedId] = useState(null);

  const userName = state?.userName || `Usuario #${user_id}`;

  const loadRecords = useCallback(async () => {
    try {
      const res = await fetchData(`admin/userSleepRecords/${user_id}`, 'GET', null, token);
      const data = res.data.result;
      setRecords(data);
      const initial = {};
      data.forEach((r) => { initial[r.record_id] = r.admin_reply || ''; });
      setReplies(initial);
    } catch (err) {
      console.log(err);
    }
  }, [token, user_id]);

  useEffect(() => {
    if (!token) return;
    loadRecords();
  }, [token, user_id, loadRecords]);

  const handleReply = async (record_id) => {
    setSavingId(record_id);
    try {
      await fetchData(`admin/sleepRecord/${record_id}/reply`, 'PUT', { admin_reply: replies[record_id] }, token);
      await loadRecords();
      setSavedId(record_id);
      setTimeout(() => setSavedId(null), 3000);
    } catch (err) {
      console.log(err);
    } finally {
      setSavingId(null);
    }
  };

  const handleSelectSlot = useCallback(({ start }) => {
    setSelectedDate(start);
  }, []);

  const handleSelectEvent = useCallback((event) => {
    setSelectedDate(event.start);
  }, []);

  const handleNavigate = useCallback((date) => {
    setCurrentDate(date);
  }, []);

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
    <div className="asr-container">
      <button className="btn-asr-back" onClick={() => navigate(-1)}>← Volver</button>
      <h2>Registros de sueño</h2>
      <p className="asr-subtitle">{userName}</p>
      <p className="asr-hint">Haz clic en un día para ver sus registros</p>

      <div className="asr-calendar-wrapper">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 480 }}
          selectable
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          date={currentDate}
          onNavigate={handleNavigate}
          culture="es"
          messages={messages}
          views={['month']}
        />
      </div>

      {selectedDate && (
        <div className="asr-day-panel">
          <p className="asr-day-title">
            {format(selectedDate, 'EEEE d MMMM yyyy', { locale: es })}
            {totalMinutes > 0 && (
              <span className="asr-total">
                — Total: {Math.floor(totalMinutes / 60)}h {totalMinutes % 60}min
              </span>
            )}
          </p>

          {dayRecords.length === 0 ? (
            <p className="asr-empty">Sin registros para este día</p>
          ) : (
            <ul className="asr-record-list">
              {dayRecords.map((r) => {
                const [sh, sm] = r.start_time.split(':').map(Number);
                const [eh, em] = r.end_time.split(':').map(Number);
                const mins = (eh * 60 + em) - (sh * 60 + sm);
                return (
                  <li key={r.record_id} className="asr-record-item">
                    <div className="asr-record-header">
                      <span className="asr-record-time">
                        {toInputTime(r.start_time)} → {toInputTime(r.end_time)}
                      </span>
                      <span className="asr-record-duration">
                        {Math.floor(mins / 60)}h {mins % 60}min
                      </span>
                    </div>

                    {r.comment && (
                      <div className="asr-user-comment">
                        <span className="asr-comment-label">Usuario:</span>
                        <span>{r.comment}</span>
                      </div>
                    )}

                    {r.comment && (
                      <div className="asr-reply-section">
                        <span className="asr-comment-label">Respuesta admin:</span>
                        <textarea
                          className="asr-reply-input"
                          rows={2}
                          maxLength={300}
                          placeholder="Escribe una respuesta..."
                          value={replies[r.record_id] ?? ''}
                          onChange={(e) => setReplies((prev) => ({ ...prev, [r.record_id]: e.target.value }))}
                        />
                        <div className="asr-reply-actions">
                          <button
                            className="btn-asr-reply"
                            disabled={savingId === r.record_id}
                            onClick={() => handleReply(r.record_id)}
                          >
                            {savingId === r.record_id ? 'Guardando...' : 'Guardar respuesta'}
                          </button>
                          {savedId === r.record_id && (
                            <span className="asr-reply-saved">✓ Respuesta guardada</span>
                          )}
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default AdminUserSleepRecords;
