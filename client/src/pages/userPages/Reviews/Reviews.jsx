import React, { useState, useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthContext/AuthContext';
import axios from 'axios';
import './reviews.css';

const API_URL = import.meta.env.VITE_SERVER_URL;

const Reviews = () => {
  const { token } = useContext(AuthContext);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) return setError('Selecciona una valoración');
    if (!comment.trim()) return setError('Escribe un comentario');

    setSubmitting(true);
    setError('');
    setSuccess('');
    try {
      await axios.post(`${API_URL}reviews`, { rating, comment }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccess('¡Gracias por tu reseña! La publicaremos en breve.');
      setRating(0);
      setComment('');
    } catch (err) {
      setError(err.response?.data?.message || 'Error al enviar la reseña');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="page-hero">
        <h1>Deja tu reseña</h1>
        <p>Tu opinión nos ayuda a mejorar y a que otras mamás conozcan Maternando360.</p>
      </div>

      <div className="reviews-container">
        <form onSubmit={handleSubmit} className="reviews-form">
          <div className="reviews-stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`star ${star <= rating ? 'selected' : ''}`}
                onClick={() => setRating(star)}
              >
                ★
              </span>
            ))}
          </div>

          <textarea
            placeholder="Cuéntanos tu experiencia..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={5}
            maxLength={500}
          />

          {error && <p className="reviews-error">{error}</p>}
          {success && <p className="reviews-success">{success}</p>}

          <button type="submit" disabled={submitting}>
            {submitting ? 'Enviando...' : 'Enviar reseña'}
          </button>
        </form>
      </div>
    </>
  );
};

export default Reviews;
