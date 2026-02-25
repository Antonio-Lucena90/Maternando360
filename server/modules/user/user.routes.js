import express from 'express'
import userController from './user.controller.js'
import { verifyToken } from '../../middleware/verifyToken.js';

const router = express.Router();


router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/oneUser', verifyToken, userController.oneUser);
router.put('/editUser', verifyToken, userController.editUser);
router.put('/deleteUser', verifyToken, userController.deleteUserLogic);
router.post('/newsletter', userController.newsletter); 

export default router;