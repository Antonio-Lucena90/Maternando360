import express from 'express';
import appointmentController from './appointment.controller.js';
import { verifyToken } from '../../middleware/verifyToken.js';
import { verifyAdmin } from '../../middleware/verifyAdmin.js';

const router = express.Router();

router.get('/allUsers', verifyToken, verifyAdmin, appointmentController.getAllUsers); 

router.post('/', verifyToken, verifyAdmin, appointmentController.createAppointment);

router.get('/user/:user_id', verifyToken, appointmentController.getUserAppointments);


export default router; 
