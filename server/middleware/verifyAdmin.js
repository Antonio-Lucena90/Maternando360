import executeQuery from '../config/db.js';
import logger from '../utils/logger.js';

export const verifyAdmin = async (req, res, next) => {
  try {
    const result = await executeQuery(
      'SELECT type FROM "user" WHERE user_id = $1 AND is_deleted = false',
      [req.user_id]
    );
    if (!result.length || result[0].type !== 1) {
      return res.status(403).json({ message: 'Acceso denegado' });
    }
    next();
  } catch (error) {
    logger.error('verifyAdmin', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
