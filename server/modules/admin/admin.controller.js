import adminDal from "./admin.dal.js";
import { v2 as cloudinary } from 'cloudinary';
import { uploadToCloudinary } from '../../utils/cloudinaryUpload.js';
import crypto from 'crypto';
import logger from '../../utils/logger.js';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

class adminController {
  allUsers = async (req, res) => {
    try {
      const result = await adminDal.allUsers();
      res.status(200).json({ message: 'ok', result });
    } catch (error) {
      logger.error('allUsers', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }

  getUserSleepRecords = async (req, res) => {
    const { user_id } = req.params;
    try {
      const result = await adminDal.getUserSleepRecords([user_id]);
      res.status(200).json({ message: 'ok', result });
    } catch (error) {
      logger.error('getUserSleepRecords', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }

  replyToSleepRecord = async (req, res) => {
    const { record_id } = req.params;
    const { admin_reply } = req.body;
    try {
      await adminDal.replyToSleepRecord([admin_reply || null, record_id]);
      res.status(200).json({ message: 'Respuesta guardada' });
    } catch (error) {
      logger.error('replyToSleepRecord', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }

  uploadDocumentForUser = async (req, res) => {
    const { user_id } = req.params;
    try {
      if (!req.file) return res.status(400).json({ message: 'No se ha enviado ningún archivo' });
      const result = await uploadToCloudinary(req.file.buffer);
      await adminDal.uploadDocumentForUser([user_id, req.file.originalname, result.public_id]);
      res.status(200).json({ message: 'Archivo subido correctamente' });
    } catch (error) {
      logger.error('uploadDocumentForUser', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }

  deleteUserDocument = async (req, res) => {
    const { user_id, doc_id } = req.params;
    try {
      const docs = await adminDal.getUserDocumentById([doc_id, user_id]);
      if (docs.length === 0) return res.status(404).json({ message: 'Documento no encontrado' });
      await cloudinary.uploader.destroy(docs[0].file_name, { resource_type: 'raw' });
      await adminDal.deleteUserDocument([doc_id, user_id]);
      res.status(200).json({ message: 'Documento eliminado' });
    } catch (error) {
      logger.error('deleteUserDocument', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }

  getUserDocuments = async (req, res) => {
    const { user_id } = req.params;
    try {
      const result = await adminDal.getUserDocuments([user_id]);
      res.status(200).json({ message: 'ok', result });
    } catch (error) {
      logger.error('getUserDocuments', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }

  downloadUserDocument = async (req, res) => {
    const { user_id, doc_id } = req.params;
    try {
      const docs = await adminDal.getUserDocumentById([doc_id, user_id]);
      if (docs.length === 0) return res.status(404).json({ message: 'Documento no encontrado' });
      const url = cloudinary.url(docs[0].file_name, { resource_type: 'raw', secure: true, flags: 'attachment' });
      res.redirect(url);
    } catch (error) {
      logger.error('downloadUserDocument', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }

  uploadAdminDocument = async (req, res) => {
    try {
      if (!req.file) return res.status(400).json({ message: 'No se ha enviado ningún archivo' });
      const result = await uploadToCloudinary(req.file.buffer);
      await adminDal.uploadAdminDocument([req.file.originalname, result.public_id]);
      res.status(200).json({ message: 'Archivo subido correctamente' });
    } catch (error) {
      logger.error('uploadAdminDocument', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }

  getAdminDocuments = async (req, res) => {
    try {
      const result = await adminDal.getAdminDocuments();
      res.status(200).json({ message: 'ok', result });
    } catch (error) {
      logger.error('getAdminDocuments', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }

  downloadAdminDocument = async (req, res) => {
    const { doc_id } = req.params;
    try {
      const docs = await adminDal.getAdminDocumentById([doc_id]);
      if (docs.length === 0) return res.status(404).json({ message: 'Documento no encontrado' });
      const url = cloudinary.url(docs[0].file_name, { resource_type: 'raw', secure: true, flags: 'attachment' });
      res.redirect(url);
    } catch (error) {
      logger.error('downloadAdminDocument', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }

  deleteAdminDocument = async (req, res) => {
    const { doc_id } = req.params;
    try {
      const docs = await adminDal.getAdminDocumentById([doc_id]);
      if (docs.length === 0) return res.status(404).json({ message: 'Documento no encontrado' });
      await cloudinary.uploader.destroy(docs[0].file_name, { resource_type: 'raw' });
      await adminDal.deleteAdminDocument([doc_id]);
      res.status(200).json({ message: 'Documento eliminado' });
    } catch (error) {
      logger.error('deleteAdminDocument', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }

  generateInviteCode = async (req, res) => {
    try {
      const code = 'MAT-' + crypto.randomBytes(4).toString('hex').toUpperCase();
      const result = await adminDal.createInviteCode([code]);
      res.status(200).json({ message: 'Código generado', code: result[0].code });
    } catch (error) {
      logger.error('generateInviteCode', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }

  getInviteCodes = async (req, res) => {
    try {
      const result = await adminDal.getInviteCodes();
      res.status(200).json({ message: 'ok', result });
    } catch (error) {
      logger.error('getInviteCodes', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }

  deleteInviteCode = async (req, res) => {
    const { code_id } = req.params;
    try {
      await adminDal.deleteInviteCode([code_id]);
      res.status(200).json({ message: 'Código eliminado' });
    } catch (error) {
      logger.error('deleteInviteCode', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }
}

export default new adminController();
