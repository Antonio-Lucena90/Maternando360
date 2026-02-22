import express from 'express';
import workshopsController from './workshops.controller.js';

import { verifyToken } from '../../middleware/verifyToken.js';

const router = express.Router();

router.post('/createWorkshop', verifyToken, workshopsController.createWorkshop );
router.get('/allWorkshops', workshopsController.allWorkshops );
router.put('/editWorkshop/:workshop_id', verifyToken, workshopsController.editWorkshop );
router.delete('/deleteWorkshop/:workshop_id', verifyToken, workshopsController.deleteWorkshop);

export default router;