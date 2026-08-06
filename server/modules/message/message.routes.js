import express from 'express';
import messageController from './message.controller.js';
import { verifyToken } from '../../middleware/verifyToken.js';
import { verifyAdmin } from '../../middleware/verifyAdmin.js';

const router = express.Router();

// Rutas estáticas primero (antes de las dinámicas con parámetros)
router.post('/', verifyToken, messageController.sendMessage);
router.get('/my', verifyToken, messageController.getMyMessages);
router.get('/unread', verifyToken, messageController.getUnreadCount);
router.put('/read', verifyToken, messageController.markAsReadByUser);

// Rutas de admin
router.get('/conversations', verifyToken, verifyAdmin, messageController.getAllConversations);
router.get('/conversations/:user_id', verifyToken, verifyAdmin, messageController.getConversation);
router.post('/reply/:user_id', verifyToken, verifyAdmin, messageController.adminReply);
router.put('/admin/:message_id', verifyToken, verifyAdmin, messageController.adminEditMessage);
router.delete('/admin/:message_id', verifyToken, verifyAdmin, messageController.adminDeleteMessage);
router.get('/admin/unread', verifyToken, verifyAdmin, messageController.getAdminUnreadCount);

// Rutas dinámicas al final
router.put('/:message_id', verifyToken, messageController.editMessage);
router.delete('/:message_id', verifyToken, messageController.deleteMessage);

export default router;
