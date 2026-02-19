import express from 'express';
import workshopsController from './workshops.controller.js';

import { verifyToken } from '../../middleware/verifyToken.js';

const router = express.Router();

router.post('/createWorkshop', verifyToken, workshopsController.createWorkshop );
router.get('/allWorkshops', verifyToken, workshopsController.allWorkshops );

export default router;