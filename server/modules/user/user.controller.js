import { compareString } from '../../utils/bcryptUtils.js';
import { generateToken } from '../../utils/tokenUtils.js';
import userDal from './user.dal.js';
import bcrypt from 'bcrypt';
import axios from 'axios';
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import { z } from 'zod';
import logger from '../../utils/logger.js';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const registerSchema = z.object({
  name: z.string()
    .min(2, 'Nombre muy corto')
    .max(50, 'Nombre demasiado largo')
    .regex(/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/, 'El nombre no puede contener números ni caracteres especiales'),
  last_name: z.string()
    .min(2, 'Apellidos muy cortos')
    .max(70, 'Apellidos demasiado largos')
    .regex(/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/, 'Los apellidos no pueden contener números ni caracteres especiales'),
  email: z.string().email('Email no válido').max(100),
  password: z.string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
      'La contraseña debe tener mínimo 8 caracteres, una mayúscula, un número y un carácter especial'
    ),
  invite_code: z.string().min(1, 'El código de invitación es obligatorio'),
  baby_name: z.string().max(100).optional()
});

class UserController {
  register = async (req, res) => {
    const parsed = registerSchema.safeParse(req.body);
    if (!parsed.success) {
      const message = parsed.error.errors[0]?.message || 'Datos inválidos';
      return res.status(400).json({ message });
    }

    try {
      const { name, last_name, email, password, invite_code, baby_name } = parsed.data;
      const validCode = await userDal.validateInviteCode([invite_code]);
      if (validCode.length === 0) {
        return res.status(400).json({ message: 'Código de invitación no válido o ya utilizado' });
      }
      const hashedPass = await bcrypt.hash(password, 10);
      await userDal.register([name.trim(), last_name.trim(), email.toLowerCase(), hashedPass, baby_name?.trim() || null]);
      await userDal.useInviteCode([validCode[0].code_id]);
      res.status(200).json({ message: 'Registro correcto' });
    } catch (error) {
      logger.error('register', error);
      if (error.code === '23505') {
        return res.status(409).json({ message: 'El email ya está registrado' });
      }
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }

  login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const result = await userDal.findUserByEmail([email]);
      if (result.length === 0) {
        return res.status(401).json({ message: 'Email no válido' });
      }
      const match = await compareString(password, result[0].password);
      if (!match) {
        return res.status(401).json({ message: 'Contraseña incorrecta' });
      }
      const token = generateToken(result[0].user_id);
      res.status(200).json({ message: 'ok', token });
    } catch (error) {
      logger.error('login', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }

  oneUser = async (req, res) => {
    const { user_id } = req;
    try {
      const result = await userDal.oneUser([user_id]);
      res.status(200).json({ message: 'ok', user: result[0] });
    } catch (error) {
      logger.error('oneUser', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }

  editUser = async (req, res) => {
    const user_id = req.user_id;
    try {
      const { name, last_name, phone, birth_date, baby_name } = req.body;
      await userDal.editUser([name, last_name, phone, birth_date, baby_name || null, user_id]);
      res.status(200).json({ message: 'Update ok' });
    } catch (error) {
      logger.error('editUser', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }

  deleteUserLogic = async (req, res) => {
    const { user_id } = req;
    try {
      await userDal.deleteUserLogic([user_id]);
      res.status(200).json({ message: 'delete ok' });
    } catch (error) {
      logger.error('deleteUserLogic', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }

  newsletter = async (req, res) => {
    const { email } = req.body;
    try {
      await axios.post(
        `https://api.beehiiv.com/v2/publications/${process.env.BEEHIIV_PUBLICATION_ID}/subscriptions`,
        { email, send_welcome_email: true, reactivate_existing: false },
        { headers: { Authorization: `Bearer ${process.env.BEEHIIV_API_KEY}`, 'Content-Type': 'application/json' } }
      );
      res.status(200).json({ message: 'Te hemos enviado un mail de confirmación' });
    } catch (error) {
      logger.error('newsletter', error.response?.data || error.message);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }

  workshopRegistration = async (req, res) => {
    const { user_id } = req;
    const { workshop_id } = req.params;
    try {
      const registered = await userDal.isUserRegistered([user_id, workshop_id]);
      if (registered.length > 0) {
        return res.status(401).json({ message: 'Ya estás inscrito en ese taller' });
      }
      const result = await userDal.workshopRegistration([user_id, workshop_id]);
      res.status(200).json({ message: 'Inscripción correcta al taller', result });
    } catch (error) {
      logger.error('workshopRegistration', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }

  fetchWorkshop = async (req, res) => {
    const { user_id } = req;
    try {
      const result = await userDal.fetchWorkshop([user_id]);
      res.status(200).json({ message: 'ok', result });
    } catch (error) {
      logger.error('fetchWorkshop', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }

  uploadDocument = async (req, res) => {
    const { user_id } = req;
    try {
      console.log('[uploadDocument] req.file:', req.file);
      if (!req.file) return res.status(400).json({ message: 'No se ha enviado ningún archivo' });
      await userDal.uploadDocument([user_id, req.file.originalname, req.file.filename]);
      res.status(200).json({ message: 'Archivo subido correctamente' });
    } catch (error) {
      console.error('[uploadDocument] error:', error);
      logger.error('uploadDocument', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }

  getUserDocuments = async (req, res) => {
    const { user_id } = req;
    try {
      const result = await userDal.getUserDocuments([user_id]);
      res.status(200).json({ message: 'ok', result });
    } catch (error) {
      logger.error('getUserDocuments', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }

  downloadDocument = async (req, res) => {
    const { user_id } = req;
    const { doc_id } = req.params;
    try {
      const docs = await userDal.getDocumentById([doc_id, user_id]);
      if (docs.length === 0) return res.status(404).json({ message: 'Documento no encontrado' });
      const url = cloudinary.url(docs[0].file_name, { resource_type: 'raw', secure: true, flags: 'attachment' });
      res.redirect(url);
    } catch (error) {
      logger.error('downloadDocument', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }

  createSleepRecord = async (req, res) => {
    const { user_id } = req;
    const { sleep_date, start_time, end_time, comment } = req.body;
    try {
      await userDal.createSleepRecord([user_id, sleep_date, start_time, end_time, comment || null]);
      res.status(200).json({ message: 'Registro de sueño guardado' });
    } catch (error) {
      logger.error('createSleepRecord', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }

  getSleepRecords = async (req, res) => {
    const { user_id } = req;
    try {
      const result = await userDal.getSleepRecords([user_id]);
      res.status(200).json({ message: 'ok', result });
    } catch (error) {
      logger.error('getSleepRecords', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }

  deleteSleepRecord = async (req, res) => {
    const { user_id } = req;
    const { record_id } = req.params;
    try {
      await userDal.deleteSleepRecord([record_id, user_id]);
      res.status(200).json({ message: 'Registro eliminado' });
    } catch (error) {
      logger.error('deleteSleepRecord', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }

  getAdminDocuments = async (req, res) => {
    try {
      const result = await userDal.getAdminDocuments();
      res.status(200).json({ message: 'ok', result });
    } catch (error) {
      logger.error('getAdminDocuments', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }

  downloadAdminDocument = async (req, res) => {
    const { doc_id } = req.params;
    try {
      const docs = await userDal.getAdminDocumentById([doc_id]);
      if (docs.length === 0) return res.status(404).json({ message: 'Documento no encontrado' });
      const url = cloudinary.url(docs[0].file_name, { resource_type: 'raw', secure: true, flags: 'attachment' });
      res.redirect(url);
    } catch (error) {
      logger.error('downloadAdminDocument', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }

  deleteDocument = async (req, res) => {
    const { user_id } = req;
    const { doc_id } = req.params;
    try {
      const docs = await userDal.getDocumentById([doc_id, user_id]);
      if (docs.length === 0) return res.status(404).json({ message: 'Documento no encontrado' });
      await cloudinary.uploader.destroy(docs[0].file_name, { resource_type: 'raw' });
      await userDal.deleteDocument([doc_id, user_id]);
      res.status(200).json({ message: 'Documento eliminado' });
    } catch (error) {
      logger.error('deleteDocument', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }
}

export default new UserController();
