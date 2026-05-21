import express from 'express'
import userController from './user.controller.js'
import { verifyToken } from '../../middleware/verifyToken.js';
import upload from '../../utils/multerConfig.js';

const router = express.Router();


router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/oneUser', verifyToken, userController.oneUser);
router.put('/editUser', verifyToken, userController.editUser);
router.put('/deleteUser', verifyToken, userController.deleteUserLogic);
router.post('/newsletter', userController.newsletter);
router.post('/workshopRegistration/:user_id/:workshop_id', verifyToken, userController.workshopRegistration);
router.get('/fetchWorkshop/:user_id', verifyToken, userController.fetchWorkshop);

router.post('/documents/upload', verifyToken, upload.single('file'), userController.uploadDocument);
router.get('/documents', verifyToken, userController.getUserDocuments);
router.get('/documents/:doc_id/download', verifyToken, userController.downloadDocument);
router.delete('/documents/:doc_id', verifyToken, userController.deleteDocument);

router.post('/sleep', verifyToken, userController.createSleepRecord);
router.get('/sleep', verifyToken, userController.getSleepRecords);
router.delete('/sleep/:record_id', verifyToken, userController.deleteSleepRecord);

router.get('/admin-documents', verifyToken, userController.getAdminDocuments);
router.get('/admin-documents/:doc_id/download', verifyToken, userController.downloadAdminDocument);

export default router;