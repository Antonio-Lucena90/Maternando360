import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthContext/AuthContext';
import axios from 'axios';
import './adminReviews.css';

const API_URL = import.meta.env.VITE_SERVER_URL;

const AdminReviews = () => {
  const { token } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) return;
    axios.get(`${API_URL}reviews/admin`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setReviews(res.data.result))
      .catch(() => setError('Error al cargar las reseñas'));
  }, [token]);

  const loadReviews = async () => {
    try {
      const res = await axios.get(`${API_URL}reviews/admin`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setReviews(res.data.result);
    } catch {
      setError('Error al cargar las reseñas');
    }
  };

  const handlePublish = async (review_id, current) => {
    try {
      await axios.put(`${API_URL}reviews/${review_id}/publish`,
        { is_published: !current },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      loadReviews();
    } catch (err) {
      setError('Error al actualizar la reseña');
    }
  };

  return (
    <div className="admin-reviews-container">
      <h2>Gestión de reseñas</h2>
      {error && <p className="admin-reviews-error">{error}</p>}
      <table className="admin-reviews-table">
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Valoración</th>
            <th>Comentario</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((r) => (
            <tr key={r.review_id}>
              <td>{r.name}</td>
              <td>{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</td>
              <td>{r.comment}</td>
              <td>{new Date(r.created_at).toLocaleDateString('es-ES')}</td>
              <td>
                <span className={r.is_published ? 'badge-published' : 'badge-pending'}>
                  {r.is_published ? 'Publicada' : 'Pendiente'}
                </span>
              </td>
              <td>
                <button
                  className={r.is_published ? 'btn-unpublish' : 'btn-publish'}
                  onClick={() => handlePublish(r.review_id, r.is_published)}
                >
                  {r.is_published ? 'Ocultar' : 'Publicar'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminReviews;
