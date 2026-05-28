import reviewsDal from "./reviews.dal.js";
import logger from '../../utils/logger.js'

class ReviewsController {

  createReview = async (req, res) => {
    const { user_id } = req;
    const { rating, comment } = req.body;
    try {
      await reviewsDal.createReview([user_id, rating, comment]);
      res.status(200).json({ message: 'Reseña enviada correctamente' });
    } catch (error) {
      logger.error('createReview', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }

  getPublishedReviews = async (req, res) => {
    try {
      const result = await reviewsDal.getPublishedReviews();
      res.status(200).json({ message: 'ok', result });
    } catch (error) {
      logger.error('getPublishedReviews', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }

  getAllReviews = async (req, res) => {
    try {
      const result = await reviewsDal.getAllReviews();
      res.status(200).json({ message: 'ok', result });
    } catch (error) {
      logger.error('getAllReviews', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }

  publishReview = async (req, res) => {
    const { review_id } = req.params;
    const { is_published } = req.body;
    try {
      await reviewsDal.publishReview([is_published, review_id]);
      res.status(200).json({ message: 'Reseña actualizada' });
    } catch (error) {
      logger.error('publishReview', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }


}

export default new ReviewsController;