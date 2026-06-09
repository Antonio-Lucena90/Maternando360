import React, { useContext, useEffect, useState } from 'react';
import { fetchData } from '../../../helpers/axiosHelper';
import { AuthContext } from '../../../contexts/AuthContext/AuthContext';
import './createAppointment.css';

const CreateAppointments = () => {
  const [users, setUsers] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [form, setForm] = useState({ user_id: '', appointment_date: '', appointment_time: '', notes: '' });
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ appointment_date: '', appointment_time: '', notes: '' });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const { token } = useContext(AuthContext);

  const fetchAppointments = async () => {
    try {
      const res = await fetchData('appointments', 'GET', null, token);
      setAppointments(res.data.result);
    } catch {
      setError('Error al cargar las citas');
    }
  };

  useEffect(() => {
    const loadAll = async () => {
      try {
        const [resUsers, resAppts] = await Promise.all([
          fetchData('appointments/allUsers', 'GET', null, token),
          fetchData('appointments', 'GET', null, token),
        ]);
        setUsers(resUsers.data.result);
        setAppointments(resAppts.data.result);
      } catch {
        setError('Error al cargar los datos');
      }
    };
    loadAll();
  }, [token]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');
    try {
      await fetchData('appointments', 'POST', form, token);
      setSuccess('Cita creada correctamente');
      setForm({ user_id: '', appointment_date: '', appointment_time: '', notes: '' });
      fetchAppointments();
    } catch {
      setError('Error al crear la cita');
    }
  };

  const handleDelete = async (appointment_id) => {
    if (!confirm('¿Seguro que quieres eliminar esta cita?')) return;
    try {
      await fetchData(`appointments/${appointment_id}`, 'DELETE', null, token);
      fetchAppointments();
    } catch {
      setError('Error al eliminar la cita');
    }
  };

  const handleEdit = (a) => {
    setEditingId(a.appointment_id);
    setEditForm({
      appointment_date: a.appointment_date.slice(0, 10),
      appointment_time: a.appointment_time.slice(0, 5),
      notes: a.notes || ''
    });
  };

  const handleUpdate = async (appointment_id) => {
    try {
      await fetchData(`appointments/${appointment_id}`, 'PUT', editForm, token);
      setEditingId(null);
      fetchAppointments();
    } catch {
      setError('Error al actualizar la cita');
    }
  };

  return (
    <div className="create-appointments-container">
      <h1>Crear Cita</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Usuario</label>
          <select name="user_id" value={form.user_id} onChange={handleChange} required>
            <option value="">Selecciona un usuario</option>
            {users.map((u) => (
              <option key={u.user_id} value={u.user_id}>{u.name} {u.last_name}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Fecha</label>
          <input type="date" name="appointment_date" value={form.appointment_date} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Hora</label>
          <input type="time" name="appointment_time" value={form.appointment_time} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Notas</label>
          <textarea name="notes" value={form.notes} onChange={handleChange} />
        </div>
        {success && <p className="success-msg">{success}</p>}
        {error && <p className="error-msg">{error}</p>}
        <button type="submit">Crear Cita</button>
      </form>

      <div className="appointments-list-admin">
        <h2>Citas existentes</h2>
        {appointments.length === 0 && <p>No hay citas creadas.</p>}
        {appointments.map((a) => (
          <div key={a.appointment_id} className="appointment-item">
            {editingId === a.appointment_id ? (
              <div className="edit-form">
                <input type="date" value={editForm.appointment_date} onChange={(e) => setEditForm({ ...editForm, appointment_date: e.target.value })} />
                <input type="time" value={editForm.appointment_time} onChange={(e) => setEditForm({ ...editForm, appointment_time: e.target.value })} />
                <textarea value={editForm.notes} onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })} />
                <div className="item-actions">
                  <button className="btn-save" onClick={() => handleUpdate(a.appointment_id)}>Guardar</button>
                  <button className="btn-cancel" onClick={() => setEditingId(null)}>Cancelar</button>
                </div>
              </div>
            ) : (
              <>
                <div className="item-info">
                  <strong>{a.name} {a.last_name}</strong>
                  <span>{new Date(a.appointment_date).toLocaleDateString('es-ES')} — {a.appointment_time.slice(0, 5)}</span>
                  {a.notes && <span className="item-notes">{a.notes}</span>}
                </div>
                <div className="item-actions">
                  <button className="btn-edit" onClick={() => handleEdit(a)}>Editar</button>
                  <button className="btn-delete" onClick={() => handleDelete(a.appointment_id)}>Eliminar</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreateAppointments;
