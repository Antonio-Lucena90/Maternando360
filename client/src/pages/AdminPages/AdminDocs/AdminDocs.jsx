import React, { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthContext/AuthContext';
import { fetchData } from '../../../helpers/axiosHelper';
import axios from 'axios';
import './adminDocs.css';

const API_URL = import.meta.env.VITE_SERVER_URL;

function AdminDocs() {
  const { token } = useContext(AuthContext);
  const [documents, setDocuments] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const fileInputRef = useRef(null);

  const loadDocuments = async () => {
    try {
      const res = await fetchData('admin/documents', 'GET', null, token);
      setDocuments(res.data.result);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!token) return;
    loadDocuments();
  }, [token]);

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
      await axios.post(`${API_URL}admin/documents/upload`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccess('Archivo subido correctamente');
      fileInputRef.current.value = '';
      loadDocuments();
    } catch (err) {
      setError(err.response?.data?.message || 'Error al subir el archivo');
    } finally {
      setUploading(false);
    }
  };

  const handleDownload = async (doc) => {
    try {
      const res = await axios.get(`${API_URL}admin/documents/${doc.doc_id}/download`, {
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
      console.log(err);
    }
  };

  const handleDelete = async (doc_id) => {
    if (!confirm('¿Eliminar este documento? Los usuarios ya no podrán descargarlo.')) return;
    try {
      await fetchData(`admin/documents/${doc_id}`, 'DELETE', null, token);
      loadDocuments();
    } catch (err) {
      console.log(err);
    }
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('es-ES', {
      day: '2-digit', month: '2-digit', year: 'numeric'
    });
  };

  return (
    <div className="adocs-container">
      <h2>Documentos compartidos</h2>
      <p className="adocs-subtitle">Los documentos que subas aquí estarán disponibles para todos los usuarios.</p>

      <form onSubmit={handleUpload} className="adocs-upload-box">
        <input type="file" ref={fileInputRef} />
        <button type="submit" className="btn-adocs-primary" disabled={uploading}>
          {uploading ? 'Subiendo...' : 'Subir documento'}
        </button>
      </form>

      {error && <p className="adocs-error">{error}</p>}
      {success && <p className="adocs-success">{success}</p>}

      {documents.length === 0 ? (
        <p className="adocs-empty">No hay documentos subidos todavía.</p>
      ) : (
        <div className="adocs-table-wrapper">
          <table className="adocs-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Fecha de subida</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc) => (
                <tr key={doc.doc_id}>
                  <td data-label="Nombre">{doc.original_name}</td>
                  <td data-label="Fecha">{formatDate(doc.uploaded_at)}</td>
                  <td data-label="Acciones">
                    <div className="adocs-actions">
                      <button className="btn-adocs-download" onClick={() => handleDownload(doc)}>
                        Descargar
                      </button>
                      <button className="btn-adocs-delete" onClick={() => handleDelete(doc.doc_id)}>
                        Eliminar
                      </button>
                    </div>
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

export default AdminDocs;
