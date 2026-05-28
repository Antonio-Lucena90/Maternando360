import express from 'express';
import reviewsController from './reviews.controller.js';
import { verifyToken } from '../../middleware/verifyToken.js';
import { verifyAdmin } from '../../middleware/verifyAdmin.js';

const router = express.Router();

router.post('/', verifyToken, reviewsController.createReview);
router.get('/public', reviewsController.getPublishedReviews);
router.get('/admin', verifyToken, verifyAdmin, reviewsController.getAllReviews);
router.put('/:review_id/publish', verifyToken, verifyAdmin, reviewsController.publishReview);

export default router;
