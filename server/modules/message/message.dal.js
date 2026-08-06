import executeQuery from "../../config/db.js";

class MessageDal {

  sendMessage = async (values) => {
    try {
      let sql = 'INSERT INTO message (user_id, content, sender) VALUES ($1, $2, $3) RETURNING *';
      let result = await executeQuery(sql, values);
      return result;
    } catch (error) {
      throw error;
    }
  }

  getMessagesByUser = async (values) => {
    try {
      let sql = 'SELECT * FROM message WHERE user_id = $1 ORDER BY created_at ASC';
      let result = await executeQuery(sql, values);
      return result;
    } catch (error) {
      throw error;
    }
  }

  getAllConversations = async () => {
    try {
      let sql = `
        SELECT DISTINCT ON (m.user_id)
          m.user_id,
          u.name,
          u.last_name,
          u.email,
          m.content AS last_message,
          m.created_at AS last_message_at,
          COUNT(m2.message_id) FILTER (WHERE m2.read = FALSE AND m2.sender = 'user') AS unread_count
        FROM message m
        JOIN "user" u ON m.user_id = u.user_id
        LEFT JOIN message m2 ON m2.user_id = m.user_id
        GROUP BY m.user_id, u.name, u.last_name, u.email, m.content, m.created_at
        ORDER BY m.user_id, m.created_at DESC
      `;
      let result = await executeQuery(sql, []);
      return result;
    } catch (error) {
      throw error;
    }
  }

  markAsRead = async (values) => {
    try {
      let sql = `UPDATE message SET read = TRUE WHERE user_id = $1 AND sender = 'user'`;
      let result = await executeQuery(sql, values);
      return result;
    } catch (error) {
      throw error;
    }
  }

  editMessage = async (values) => {
    try {
      let sql = 'UPDATE message SET content = $1, updated_at = NOW() WHERE message_id = $2 AND user_id = $3 RETURNING *';
      let result = await executeQuery(sql, values);
      return result;
    } catch (error) {
      throw error;
    }
  }

  deleteMessage = async (values) => {
    try {
      let sql = 'DELETE FROM message WHERE message_id = $1 AND user_id = $2';
      await executeQuery(sql, values);
    } catch (error) {
      throw error;
    }
  }

  adminEditMessage = async (values) => {
    try {
      let sql = `UPDATE message SET content = $1, updated_at = NOW() WHERE message_id = $2 AND sender = 'admin' RETURNING *`;
      let result = await executeQuery(sql, values);
      return result;
    } catch (error) {
      throw error;
    }
  }

  adminDeleteMessage = async (values) => {
    try {
      let sql = `DELETE FROM message WHERE message_id = $1 AND sender = 'admin'`;
      await executeQuery(sql, values);
    } catch (error) {
      throw error;
    }
  }
}

export default new MessageDal();
