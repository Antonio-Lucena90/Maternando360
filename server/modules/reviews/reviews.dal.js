import executeQuery from '../../config/db.js';

class ReviewsDal{

  createReview = async (values) => {
    const sql = 'INSERT INTO review (user_id, rating, comment) VALUES ($1, $2, $3)';
    return await executeQuery(sql, values);
  }

  getPublishedReviews = async () => {
    const sql = `SELECT r.review_id, r.rating, r.comment, r.created_at, u.name 
                 FROM review r JOIN "user" u ON r.user_id = u.user_id 
                 WHERE r.is_published = true ORDER BY r.created_at DESC`;
    return await executeQuery(sql, []);
  }

  publishReview = async (values) => {
    const sql = 'UPDATE review SET is_published = $1 WHERE review_id = $2';
    return await executeQuery(sql, values);
  }

  getAllReviews = async () => {
    const sql = `SELECT r.review_id, r.rating, r.comment, r.created_at, r.is_published, u.name 
                 FROM review r JOIN "user" u ON r.user_id = u.user_id 
                 ORDER BY r.created_at DESC`;
    return await executeQuery(sql, []);
  }

}

export default new ReviewsDal;