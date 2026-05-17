import { useState, useEffect, useContext } from 'react';
import { Button, Container } from 'react-bootstrap';
import { fetchData } from '../../../helpers/axiosHelper';
import { AuthContext } from '../../../contexts/AuthContext/AuthContext';

const AdminInviteCodes = () => {
  const { token } = useContext(AuthContext);
  const [codes, setCodes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(null);

  const loadCodes = async () => {
    try {
      const res = await fetchData('admin/inviteCodes', 'GET', null, token);
      setCodes(res.data.result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!token) return;
    loadCodes();
  }, [token]);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      await fetchData('admin/inviteCodes/generate', 'POST', null, token);
      await loadCodes();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopied(code);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleDelete = async (code_id) => {
    if (!confirm('¿Eliminar este código?')) return;
    try {
      await fetchData(`admin/inviteCodes/${code_id}`, 'DELETE', null, token);
      await loadCodes();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Códigos de Invitación</h3>
        <Button className="my-btn" onClick={handleGenerate} disabled={loading}>
          {loading ? 'Generando...' : 'Generar nuevo código'}
        </Button>
      </div>

      <table className="w-100" style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#4a7c59', color: 'white' }}>
            <th style={{ padding: '10px' }}>Código</th>
            <th style={{ padding: '10px' }}>Estado</th>
            <th style={{ padding: '10px' }}>Creado</th>
            <th style={{ padding: '10px' }}>Acción</th>
          </tr>
        </thead>
        <tbody>
          {codes.map((c) => (
            <tr key={c.code_id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '10px', fontFamily: 'monospace', fontWeight: 'bold' }}>
                {c.code}
              </td>
              <td style={{ padding: '10px' }}>
                <span style={{ color: c.used ? '#999' : '#4a7c59', fontWeight: 'bold' }}>
                  {c.used ? 'Utilizado' : 'Disponible'}
                </span>
              </td>
              <td style={{ padding: '10px' }}>
                {new Date(c.created_at).toLocaleDateString('es-ES')}
              </td>
              <td style={{ padding: '10px', display: 'flex', gap: '8px' }}>
                {!c.used && (
                  <Button
                    size="sm"
                    className="my-btn"
                    onClick={() => handleCopy(c.code)}
                  >
                    {copied === c.code ? '¡Copiado!' : 'Copiar'}
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => handleDelete(c.code_id)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
          {codes.length === 0 && (
            <tr>
              <td colSpan={4} style={{ padding: '20px', textAlign: 'center', color: '#999' }}>
                No hay códigos generados todavía
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </Container>
  );
};

export default AdminInviteCodes;
