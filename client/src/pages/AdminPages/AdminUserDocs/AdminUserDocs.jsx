import React, { useContext, useEffect, useRef, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../../../contexts/AuthContext/AuthContext';
import { fetchData } from '../../../helpers/axiosHelper';
import axios from 'axios';
import './adminUserDocs.css';

const API_URL = import.meta.env.VITE_SERVER_URL;

function AdminUserDocs() {
  const { user_id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const [documents, setDocuments] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const userName = state?.userName || `Usuario #${user_id}`;

  const load = async () => {
    try {
      const res = await fetchData(`admin/userDocuments/${user_id}`, 'GET', null, token);
      setDocuments(res.data.result);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!token) return;
    load();
  }, [token, user_id]);

  const handleUpload = async (e) => {
    e.preventDefault();
    const file = fileInputRef.current?.files[0];
    if (!file) return setError('Selecciona un archivo primero');

    const formData = new FormData();
    formData.append('file', file);

    setUploading(true);
    setError('');
    setSuccess('');
    try {
      await axios.post(`${API_URL}admin/userDocuments/${user_id}/upload`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccess('Archivo subido correctamente');
      fileInputRef.current.value = '';
      load();
    } catch (err) {
      setError(err.response?.data?.message || 'Error al subir el archivo');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (doc_id) => {
    if (!confirm('¿Eliminar este documento?')) return;
    try {
      await fetchData(`admin/userDocuments/${user_id}/${doc_id}`, 'DELETE', null, token);
      load();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDownload = async (doc) => {
    try {
      const res = await axios.get(`${API_URL}admin/userDocuments/${user_id}/${doc.doc_id}/download`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob'
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', doc.original_name);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('[handleDownload] error:', err);
      if (err.response?.data instanceof Blob) {
        const text = await err.response.data.text();
        setError(`Error al descargar: ${text}`);
      } else {
        setError(err.response?.data?.message || 'Error al descargar el documento');
      }
    }
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('es-ES', {
      day: '2-digit', month: '2-digit', year: 'numeric'
    });
  };

  return (
    <div className="aud-container">
      <button className="btn-aud-back" onClick={() => navigate(-1)}>← Volver</button>
      <h2>Documentos</h2>
      <p className="aud-subtitle">{userName}</p>

      <form onSubmit={handleUpload} className="aud-upload-box">
        <input type="file" ref={fileInputRef} />
        <button type="submit" className="btn-aud-upload" disabled={uploading}>
          {uploading ? 'Subiendo...' : 'Subir documento al usuario'}
        </button>
      </form>
      {error && <p className="aud-error">{error}</p>}
      {success && <p className="aud-success">{success}</p>}

      {documents.length === 0 ? (
        <p className="aud-empty">Este usuario no tiene ningún documento todavía.</p>
      ) : (
        <div className="aud-table-wrapper">
          <table className="aud-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Fecha de subida</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc) => (
                <tr key={doc.doc_id}>
                  <td>
                    {doc.original_name}
                    <span className={`aud-badge ${doc.uploaded_by === 'admin' ? 'aud-badge-admin' : 'aud-badge-user'}`}>
                      {doc.uploaded_by === 'admin' ? 'Admin' : 'Usuario'}
                    </span>
                  </td>
                  <td>{formatDate(doc.uploaded_at)}</td>
                  <td style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="btn-aud-download" onClick={() => handleDownload(doc)}>
                      Descargar
                    </button>
                    <button className="btn-aud-delete" onClick={() => handleDelete(doc.doc_id)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminUserDocs;
