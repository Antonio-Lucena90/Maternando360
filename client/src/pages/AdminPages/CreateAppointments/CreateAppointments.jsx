import React, { useContext, useEffect, useState } from 'react';
import { fetchData } from '../../../helpers/axiosHelper';
import { AuthContext } from '../../../contexts/AuthContext/AuthContext';

import './createAppointment.css';

const CreateAppointments = () => {
  const [users, setUsers] = useState();
  const [form, setForm] = useState({
    user_id: '',
    appointment_date: '',
    appointment_time: '',
    notes: '',
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetchData(
          'appointments/allUsers',
          'GET',
          null,
          token,
        );
        setUsers(res.data.result);
        console.log(res.data.result);
      } catch {
        setError('Error al cargar los usuarios');
      }
    };
    fetchUsers();
  }, []);

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
      setForm({
        user_id: '',
        appointment_date: '',
        appointment_time: '',
        notes: '',
      });
    } catch {
      setError('Error al crear la cita');
    }
  };

  return (
    <div className="create-appointments-container">
      <h1>Crear Cita</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Usuario</label>
          <select
            name="user_id"
            value={form.user_id}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona un usuario</option>
            {users?.map((u) => (
              <option key={u.user_id} value={u.user_id}>
                {u.name} {u.last_name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Fecha</label>
          <input
            type="date"
            name="appointment_date"
            value={form.appointment_date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Hora</label>
          <input
            type="time"
            name="appointment_time"
            value={form.appointment_time}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Notas</label>
          <textarea name="notes" value={form.notes} onChange={handleChange} />
        </div>
        {success && <p className="success-msg">{success}</p>}
        {error && <p className="error-msg">{error}</p>}
        <button type="submit" className="my-btn">
          Crear Cita
        </button>
      </form>
    </div>
  );
};

export default CreateAppointments;
