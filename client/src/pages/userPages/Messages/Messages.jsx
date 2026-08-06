import { useEffect, useState, useContext } from 'react';
import { fetchData } from '../../../helpers/axiosHelper';
import { AuthContext } from '../../../contexts/AuthContext/AuthContext';
import './messages.css';

const Messages = () => {
  const { user, token } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState('');
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [error, setError] = useState('');

  const loadMessages = async () => {
    try {
      const res = await fetchData('message/my', 'GET', null, token);
      setMessages(res.data.result ?? []);
    } catch {
      setError('Error al cargar los mensajes');
    }
  };

  useEffect(() => {
    const load = async () => {
      try {
        const [msgsRes] = await Promise.all([
          fetchData('message/my', 'GET', null, token),
          fetchData('message/read', 'PUT', null, token),
        ]);
        setMessages(msgsRes.data.result ?? []);
        window.dispatchEvent(new Event('messages-read'));
      } catch {
        setError('Error al cargar los mensajes');
      }
    };
    load();
  }, [token]);

  const handleSend = async () => {
    if (!newMessage.trim()) return;
    try {
      await fetchData('message', 'POST', { content: newMessage }, token);
      setNewMessage('');
      loadMessages();
    } catch {
      setError('Error al enviar el mensaje');
    }
  };

  const handleEdit = async (message_id) => {
    if (!editContent.trim()) return;
    try {
      await fetchData(`message/${message_id}`, 'PUT', { content: editContent }, token);
      setEditingId(null);
      setEditContent('');
      loadMessages();
    } catch {
      setError('Error al editar el mensaje');
    }
  };

  const handleDelete = async (message_id) => {
    try {
      await fetchData(`message/${message_id}`, 'DELETE', null, token);
      setConfirmDeleteId(null);
      loadMessages();
    } catch {
      setError('Error al eliminar el mensaje');
    }
  };

  const startEdit = (msg) => {
    setEditingId(msg.message_id);
    setEditContent(msg.content);
    setConfirmDeleteId(null);
  };

  return (
    <div className="messages-page">
      <div className="page-hero">
        <h1>Mensajes</h1>
        <p>Escríbenos cualquier duda o consulta y te responderemos lo antes posible.</p>
      </div>

      <div className="messages-container">
        <div className="messages-thread">
          {messages.length === 0 && (
            <p className="messages-empty">Aún no hay mensajes. ¡Escríbenos!</p>
          )}
          {messages.map((msg) => (
            <div
              key={msg.message_id}
              className={`message-bubble ${msg.sender === 'user' ? 'message-bubble--user' : 'message-bubble--admin'}`}
            >
              <div className="message-bubble__header">
                <span className="message-bubble__sender">
                  {msg.sender === 'user' ? user.name : 'Maternando360'}
                </span>
                <span className="message-bubble__time">
                  {new Date(msg.created_at).toLocaleString('es-ES', {
                    day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit'
                  })}
                  {msg.updated_at && <em> (editado)</em>}
                </span>
              </div>

              {editingId === msg.message_id ? (
                <div className="message-edit">
                  <textarea
                    className="messages-textarea"
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    rows={2}
                  />
                  <div className="message-edit__actions">
                    <button className="my-btn" onClick={() => handleEdit(msg.message_id)}>Guardar</button>
                    <button className="my-btn my-btn--outline" onClick={() => setEditingId(null)}>Cancelar</button>
                  </div>
                </div>
              ) : (
                <p className="message-bubble__content">{msg.content}</p>
              )}

              {msg.sender === 'user' && editingId !== msg.message_id && (
                <div className="message-bubble__actions">
                  <button className="msg-action-btn" onClick={() => startEdit(msg)}>Editar</button>

                  {confirmDeleteId === msg.message_id ? (
                    <>
                      <span className="msg-action-btn">¿Seguro?</span>
                      <button className="msg-action-btn msg-action-btn--delete" onClick={() => handleDelete(msg.message_id)}>Sí, eliminar</button>
                      <button className="msg-action-btn" onClick={() => setConfirmDeleteId(null)}>Cancelar</button>
                    </>
                  ) : (
                    <button className="msg-action-btn msg-action-btn--delete" onClick={() => setConfirmDeleteId(msg.message_id)}>Eliminar</button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {error && <p className="messages-error">{error}</p>}

        <div className="messages-input-area">
          <textarea
            className="messages-textarea"
            placeholder="Escribe tu mensaje... (Enter para enviar, Shift+Enter para salto de línea)"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            rows={3}
          />
          <button className="my-btn" onClick={handleSend}>Enviar</button>
        </div>
      </div>
    </div>
  );
};

export default Messages;
