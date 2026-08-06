import express from 'express';
import messageController from './message.controller.js';
import { verifyToken } from '../../middleware/verifyToken.js';
import { verifyAdmin } from '../../middleware/verifyAdmin.js';

const router = express.Router();

// Rutas de usuario (requieren login)
router.post('/', verifyToken, messageController.sendMessage);
router.get('/my', verifyToken, messageController.getMyMessages);
router.put('/:message_id', verifyToken, messageController.editMessage);
router.delete('/:message_id', verifyToken, messageController.deleteMessage);

// Rutas de admin
router.get('/conversations', verifyToken, verifyAdmin, messageController.getAllConversations);
router.get('/conversations/:user_id', verifyToken, verifyAdmin, messageController.getConversation);
router.post('/reply/:user_id', verifyToken, verifyAdmin, messageController.adminReply);
router.put('/admin/:message_id', verifyToken, verifyAdmin, messageController.adminEditMessage);
router.delete('/admin/:message_id', verifyToken, verifyAdmin, messageController.adminDeleteMessage);

export default router;
