import appointmentDal from './appointment.dal.js';
import logger from '../../utils/logger.js';

class AppointmentController {

  getAllUsers = async (req, res) => {
    try {
      const result = await appointmentDal.getAllUsers();
      res.status(200).json({ message: 'ok', result });
    } catch (error) {
      logger.error('allUsers', error);
      res.status(500).json({message: 'Error interno del servidor'});
    }
  }

  createAppointment = async (req, res) => {
    try {
      const {user_id, appointment_date, appointment_time, notes} = req.body;
      await appointmentDal.createAppointment([user_id, appointment_date, appointment_time, notes]);
      res.status(201).json({message: 'Cita creada exitosamente'});
    } catch (error) {
      logger.error('createAppointment', error);
      res.status(500).json({message: 'Error interno del servidor'});
    }
  }

  getUserAppointments = async (req, res) => {
  try {
    const { user_id } = req.params;
    const result = await appointmentDal.getUserAppointments([user_id]);
    res.status(200).json({ message: 'ok', result });
  } catch (error) {
    logger.error('getUserAppointments', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}

getAllAppointments = async (req, res) => {
  try {
    const result = await appointmentDal.getAllAppointments();
    res.status(200).json({ message: 'ok', result });
  } catch (error) {
    logger.error('getAllAppointments', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}

deleteAppointment = async (req, res) => {
  try {
    const { appointment_id } = req.params;
    await appointmentDal.deleteAppointment([appointment_id]);
    res.status(200).json({ message: 'Cita eliminada correctamente' });
  } catch (error) {
    logger.error('deleteAppointment', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}

updateAppointment = async (req, res) => {
  try {
    const { appointment_id } = req.params;
    const { appointment_date, appointment_time, notes } = req.body;
    await appointmentDal.updateAppointment([appointment_date, appointment_time, notes, appointment_id]);
    res.status(200).json({ message: 'Cita actualizada correctamente' });
  } catch (error) {
    logger.error('updateAppointment', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}



}

export default new AppointmentController(); 