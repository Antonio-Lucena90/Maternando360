import { useEffect, useState, useContext } from 'react';
import { fetchData } from '../../../helpers/axiosHelper';
import { AuthContext } from '../../../contexts/AuthContext/AuthContext';
import './adminMessages.css';
import '../../userPages/Messages/messages.css';

const AdminMessages = () => {
  const { token } = useContext(AuthContext);
  const [conversations, setConversations] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [showUserPicker, setShowUserPicker] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [reply, setReply] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState('');
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [error, setError] = useState('');

  const loadConversations = async () => {
    try {
      const res = await fetchData('message/conversations', 'GET', null, token);
      setConversations(res.data.result ?? []);
    } catch {
      setError('Error al cargar las conversaciones');
    }
  };

  const loadMessages = async (user_id) => {
    try {
      const res = await fetchData(`message/conversations/${user_id}`, 'GET', null, token);
      setMessages(res.data.result ?? []);
    } catch {
      setError('Error al cargar la conversación');
    }
  };

  useEffect(() => {
    const load = async () => {
      try {
        const [convRes, usersRes] = await Promise.all([
          fetchData('message/conversations', 'GET', null, token),
          fetchData('admin/allUsersRegistered', 'GET', null, token),
        ]);
        setConversations(convRes.data.result ?? []);
        setAllUsers(usersRes.data.result ?? []);
      } catch {
        setError('Error al cargar los datos');
      }
    };
    load();
  }, [token]);

  const openConversation = async (user) => {
    setSelectedUser(user);
    setReply('');
    setEditingId(null);
    setConfirmDeleteId(null);
    setShowUserPicker(false);
    setError('');
    await loadMessages(user.user_id);
    loadConversations();
  };

  const handleReply = async () => {
    if (!reply.trim()) return;
    try {
      await fetchData(`message/reply/${selectedUser.user_id}`, 'POST', { content: reply }, token);
      setReply('');
      await loadMessages(selectedUser.user_id);
      loadConversations();
    } catch {
      setError('Error al enviar la respuesta');
    }
  };

  const handleEdit = async (message_id) => {
    if (!editContent.trim()) return;
    try {
      await fetchData(`message/admin/${message_id}`, 'PUT', { content: editContent }, token);
      setEditingId(null);
      setEditContent('');
      await loadMessages(selectedUser.user_id);
    } catch {
      setError('Error al editar el mensaje');
    }
  };

  const handleDelete = async (message_id) => {
    try {
      await fetchData(`message/admin/${message_id}`, 'DELETE', null, token);
      setConfirmDeleteId(null);
      await loadMessages(selectedUser.user_id);
      loadConversations();
    } catch {
      setError('Error al eliminar el mensaje');
    }
  };

  const startEdit = (msg) => {
    setEditingId(msg.message_id);
    setEditContent(msg.content);
    setConfirmDeleteId(null);
  };

  // Usuarios sin conversación previa
  const usersWithoutConversation = allUsers.filter(
    (u) => !conversations.find((c) => c.user_id === u.user_id)
  );

  return (
    <div className="admin-messages">
      <div className="page-hero">
        <h1>Mensajes</h1>
        <p>Conversaciones con usuarias registradas.</p>
      </div>

      <div className="admin-messages__layout">

        {/* Lista de conversaciones */}
        <div className="conversations-list">
          <button
            className="my-btn new-conversation-btn"
            onClick={() => setShowUserPicker(!showUserPicker)}
          >
            + Nueva conversación
          </button>

          {/* Selector de usuario */}
          {showUserPicker && (
            <div className="user-picker">
              {usersWithoutConversation.length === 0 && (
                <p className="user-picker__empty">Todas las usuarias ya tienen conversación.</p>
              )}
              {usersWithoutConversation.map((u) => (
                <div
                  key={u.user_id}
                  className="user-picker__item"
                  onClick={() => openConversation(u)}
                >
                  <div className="conversation-item__avatar">
                    {u.name[0].toUpperCase()}{u.last_name[0].toUpperCase()}
                  </div>
                  <div className="conversation-item__info">
                    <span className="conversation-item__name">{u.name} {u.last_name}</span>
                    <span className="conversation-item__preview">{u.email}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {conversations.length === 0 && !showUserPicker && (
            <p className="conversations-empty">No hay mensajes todavía.</p>
          )}
          {conversations.map((conv) => (
            <div
              key={conv.user_id}
              className={`conversation-item ${selectedUser?.user_id === conv.user_id ? 'conversation-item--active' : ''}`}
              onClick={() => openConversation(conv)}
            >
              <div className="conversation-item__avatar">
                {conv.name[0].toUpperCase()}{conv.last_name[0].toUpperCase()}
              </div>
              <div className="conversation-item__info">
                <span className="conversation-item__name">{conv.name} {conv.last_name}</span>
                <span className="conversation-item__preview">{conv.last_message}</span>
              </div>
              {conv.unread_count > 0 && (
                <span className="conversation-item__badge">{conv.unread_count}</span>
              )}
            </div>
          ))}
        </div>

        {/* Hilo de mensajes */}
        <div className="conversation-thread">
          {!selectedUser ? (
            <p className="thread-empty">Selecciona una conversación</p>
          ) : (
            <>
              <div className="thread-header">
                <span>{selectedUser.name} {selectedUser.last_name}</span>
                <span className="thread-header__email">{selectedUser.email}</span>
              </div>

              <div className="thread-messages">
                {messages.length === 0 && (
                  <p className="thread-empty">Aún no hay mensajes. ¡Empieza la conversación!</p>
                )}
                {messages.map((msg) => (
                  <div
                    key={msg.message_id}
                    className={`message-bubble ${msg.sender === 'admin' ? 'message-bubble--user' : 'message-bubble--admin'}`}
                  >
                    <div className="message-bubble__header">
                      <span className="message-bubble__sender">
                        {msg.sender === 'admin' ? 'Tú' : selectedUser.name}
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

                    {msg.sender === 'admin' && editingId !== msg.message_id && (
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

              <div className="thread-reply">
                <textarea
                  className="messages-textarea"
                  placeholder="Escribe tu mensaje..."
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  rows={3}
                />
                <button className="my-btn" onClick={handleReply}>Enviar</button>
              </div>
            </>
          )}
        </div>

      </div>
    </div>
  );
};

export default AdminMessages;
