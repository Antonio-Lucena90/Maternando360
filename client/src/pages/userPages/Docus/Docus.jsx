import React, { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthContext/AuthContext';
import { fetchData } from '../../../helpers/axiosHelper';
import axios from 'axios';
import './docus.css';

const API_URL = import.meta.env.VITE_SERVER_URL;

function Docus() {
  const { token } = useContext(AuthContext);
  const [documents, setDocuments] = useState([]);
  const [adminDocuments, setAdminDocuments] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const fileInputRef = useRef(null);

  const loadDocuments = async () => {
    try {
      const res = await fetchData('user/documents', 'GET', null, token);
      setDocuments(res.data.result);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!token) return;
    const fetchAll = async () => {
      try {
        const [userRes, adminRes] = await Promise.all([
          fetchData('user/documents', 'GET', null, token),
          fetchData('user/admin-documents', 'GET', null, token)
        ]);
        setDocuments(userRes.data.result);
        setAdminDocuments(adminRes.data.result);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAll();
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
      await axios.post(`${API_URL}user/documents/upload`, formData, {
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

  const handleDownloadAdmin = async (doc) => {
    try {
      const res = await axios.get(`${API_URL}user/admin-documents/${doc.doc_id}/download`, {
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

  const handleDownload = async (doc) => {
    try {
      const res = await axios.get(`${API_URL}user/documents/${doc.doc_id}/download`, {
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
    if (!confirm('¿Eliminar este documento?')) return;
    try {
      await fetchData(`user/documents/${doc_id}`, 'DELETE', null, token);
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
    <div className="docus-container">
      {adminDocuments.length > 0 && (
        <div className="docus-admin-section">
          <h3 className="docus-admin-title">Documentos de Maternando360</h3>
          <div className="docus-table-wrapper">
            <table className="docus-table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Fecha</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {adminDocuments.map((doc) => (
                  <tr key={doc.doc_id}>
                    <td data-label="Nombre">{doc.original_name}</td>
                    <td data-label="Fecha">{formatDate(doc.uploaded_at)}</td>
                    <td data-label="Acciones">
                      <div className="docus-actions">
                        <button className="btn-docus-download" onClick={() => handleDownloadAdmin(doc)}>
                          Descargar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <h2>Mis documentos</h2>

      <form onSubmit={handleUpload} className="docus-upload-box">
        <input type="file" ref={fileInputRef} />
        <button type="submit" className="btn-docus-primary" disabled={uploading}>
          {uploading ? 'Subiendo...' : 'Subir archivo'}
        </button>
      </form>

      {error && <p className="docus-error">{error}</p>}
      {success && <p className="docus-success">{success}</p>}

      {documents.length === 0 ? (
        <p className="docus-empty">No tienes documentos subidos todavía.</p>
      ) : (
        <div className="docus-table-wrapper">
          <table className="docus-table">
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
                  <td data-label="Nombre">
                    {doc.original_name}
                    {doc.uploaded_by === 'admin' && (
                      <span className="doc-badge doc-badge-admin">Maternando360</span>
                    )}
                  </td>
                  <td data-label="Fecha">{formatDate(doc.uploaded_at)}</td>
                  <td data-label="Acciones">
                    <div className="docus-actions">
                      <button className="btn-docus-download" onClick={() => handleDownload(doc)}>
                        Descargar
                      </button>
                      {doc.uploaded_by !== 'admin' && (
                        <button className="btn-docus-delete" onClick={() => handleDelete(doc.doc_id)}>
                          Eliminar
                        </button>
                      )}
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

export default Docus;
