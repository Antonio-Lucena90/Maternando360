import messageDal from './message.dal.js';

class MessageController {

  sendMessage = async (req, res) => {
    const user_id = req.user_id;
    const { content } = req.body;
    if (!content?.trim()) {
      return res.status(400).json({ message: 'El mensaje no puede estar vacío' });
    }
    try {
      const result = await messageDal.sendMessage([user_id, content.trim(), 'user']);
      res.status(201).json({ message: 'ok', result });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  adminReply = async (req, res) => {
    const { user_id } = req.params;
    const { content } = req.body;
    if (!content?.trim()) {
      return res.status(400).json({ message: 'El mensaje no puede estar vacío' });
    }
    try {
      const result = await messageDal.sendMessage([user_id, content.trim(), 'admin']);
      res.status(201).json({ message: 'ok', result });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  getMyMessages = async (req, res) => {
    const user_id = req.user_id;
    try {
      const result = await messageDal.getMessagesByUser([user_id]);
      res.status(200).json({ message: 'ok', result });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  getConversation = async (req, res) => {
    const { user_id } = req.params;
    try {
      await messageDal.markAsRead([user_id]);
      const result = await messageDal.getMessagesByUser([user_id]);
      res.status(200).json({ message: 'ok', result });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  getAllConversations = async (req, res) => {
    try {
      const result = await messageDal.getAllConversations();
      res.status(200).json({ message: 'ok', result });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  editMessage = async (req, res) => {
    const user_id = req.user_id;
    const { message_id } = req.params;
    const { content } = req.body;
    if (!content?.trim()) {
      return res.status(400).json({ message: 'El mensaje no puede estar vacío' });
    }
    try {
      const result = await messageDal.editMessage([content.trim(), message_id, user_id]);
      res.status(200).json({ message: 'ok', result });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  deleteMessage = async (req, res) => {
    const user_id = req.user_id;
    const { message_id } = req.params;
    try {
      await messageDal.deleteMessage([message_id, user_id]);
      res.status(200).json({ message: 'ok' });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  adminEditMessage = async (req, res) => {
    const { message_id } = req.params;
    const { content } = req.body;
    if (!content?.trim()) {
      return res.status(400).json({ message: 'El mensaje no puede estar vacío' });
    }
    try {
      const result = await messageDal.adminEditMessage([content.trim(), message_id]);
      res.status(200).json({ message: 'ok', result });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  adminDeleteMessage = async (req, res) => {
    const { message_id } = req.params;
    try {
      await messageDal.adminDeleteMessage([message_id]);
      res.status(200).json({ message: 'ok' });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  getUnreadCount = async (req, res) => {
    const user_id = req.user_id;
    try {
      const result = await messageDal.getUnreadCountForUser([user_id]);
      res.status(200).json({ message: 'ok', count: parseInt(result[0].count) });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  getAdminUnreadCount = async (req, res) => {
    try {
      const result = await messageDal.getUnreadCountForAdmin();
      res.status(200).json({ message: 'ok', count: parseInt(result[0].count) });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  markAsReadByUser = async (req, res) => {
    const user_id = req.user_id;
    try {
      await messageDal.markAdminMessagesAsRead([user_id]);
      res.status(200).json({ message: 'ok' });
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

export default new MessageController();
