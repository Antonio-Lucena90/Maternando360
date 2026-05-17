import express from 'express';
import adminController from './admin.controller.js';
import { verifyToken } from '../../middleware/verifyToken.js';
import { verifyAdmin } from '../../middleware/verifyAdmin.js';
import upload from '../../utils/multerConfig.js';

const router = express.Router();

router.get('/allUsersRegistered', verifyToken, verifyAdmin, adminController.allUsers);
router.get('/userSleepRecords/:user_id', verifyToken, verifyAdmin, adminController.getUserSleepRecords);
router.put('/sleepRecord/:record_id/reply', verifyToken, verifyAdmin, adminController.replyToSleepRecord);

router.post('/userDocuments/:user_id/upload', verifyToken, verifyAdmin, upload.single('file'), adminController.uploadDocumentForUser);
router.get('/userDocuments/:user_id', verifyToken, verifyAdmin, adminController.getUserDocuments);
router.get('/userDocuments/:user_id/:doc_id/download', verifyToken, verifyAdmin, adminController.downloadUserDocument);
router.delete('/userDocuments/:user_id/:doc_id', verifyToken, verifyAdmin, adminController.deleteUserDocument);

router.post('/documents/upload', verifyToken, verifyAdmin, upload.single('file'), adminController.uploadAdminDocument);
router.get('/documents', verifyToken, verifyAdmin, adminController.getAdminDocuments);
router.get('/documents/:doc_id/download', verifyToken, verifyAdmin, adminController.downloadAdminDocument);
router.delete('/documents/:doc_id', verifyToken, verifyAdmin, adminController.deleteAdminDocument);

router.post('/inviteCodes/generate', verifyToken, verifyAdmin, adminController.generateInviteCode);
router.get('/inviteCodes', verifyToken, verifyAdmin, adminController.getInviteCodes);
router.delete('/inviteCodes/:code_id', verifyToken, verifyAdmin, adminController.deleteInviteCode);

export default router;