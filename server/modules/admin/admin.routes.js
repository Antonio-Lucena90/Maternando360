import express from 'express';
import adminController from './admin.controller.js';

import { verifyToken } from '../../middleware/verifyToken.js';

const router = express.Router();

router.get('/allUsersRegistered', verifyToken, adminController.allUsers );


export default router;