import executeQuery from "../../config/db.js";

class adminDal{
  allUsers = async() => {
    try {
      let sql = 'SELECT user_id, name, last_name, birth_date, email, phone, baby_name FROM "user" WHERE type = 2';
      let result = await executeQuery(sql);
      return result;
    } catch (error) {
      throw error
    }
  }

  getUserSleepRecords = async(values) => {
    try {
      let sql = 'SELECT * FROM sleep_record WHERE user_id = $1 ORDER BY sleep_date, start_time';
      let result = await executeQuery(sql, values);
      return result;
    } catch (error) {
      throw error;
    }
  }

  replyToSleepRecord = async(values) => {
    try {
      let sql = 'UPDATE sleep_record SET admin_reply = $1 WHERE record_id = $2';
      let result = await executeQuery(sql, values);
      return result;
    } catch (error) {
      throw error;
    }
  }

  uploadDocumentForUser = async(values) => {
    try {
      let sql = "INSERT INTO document (user_id, original_name, file_name, uploaded_by) VALUES ($1,$2,$3,'admin')";
      let result = await executeQuery(sql, values);
      return result;
    } catch (error) {
      throw error;
    }
  }

  getUserDocuments = async(values) => {
    try {
      let sql = 'SELECT doc_id, original_name, file_name, uploaded_at, uploaded_by FROM document WHERE user_id = $1 ORDER BY uploaded_at DESC';
      let result = await executeQuery(sql, values);
      return result;
    } catch (error) {
      throw error;
    }
  }

  getUserDocumentById = async(values) => {
    try {
      let sql = 'SELECT * FROM document WHERE doc_id = $1 AND user_id = $2';
      let result = await executeQuery(sql, values);
      return result;
    } catch (error) {
      throw error;
    }
  }

  deleteUserDocument = async(values) => {
    try {
      let sql = 'DELETE FROM document WHERE doc_id = $1 AND user_id = $2';
      let result = await executeQuery(sql, values);
      return result;
    } catch (error) {
      throw error;
    }
  }

  uploadAdminDocument = async(values) => {
    try {
      let sql = 'INSERT INTO admin_document (original_name, file_name) VALUES ($1,$2)';
      let result = await executeQuery(sql, values);
      return result;
    } catch (error) {
      throw error;
    }
  }

  getAdminDocuments = async() => {
    try {
      let sql = 'SELECT doc_id, original_name, file_name, uploaded_at FROM admin_document ORDER BY uploaded_at DESC';
      let result = await executeQuery(sql);
      return result;
    } catch (error) {
      throw error;
    }
  }

  getAdminDocumentById = async(values) => {
    try {
      let sql = 'SELECT * FROM admin_document WHERE doc_id = $1';
      let result = await executeQuery(sql, values);
      return result;
    } catch (error) {
      throw error;
    }
  }

  deleteAdminDocument = async(values) => {
    try {
      let sql = 'DELETE FROM admin_document WHERE doc_id = $1';
      let result = await executeQuery(sql, values);
      return result;
    } catch (error) {
      throw error;
    }
  }

  createInviteCode = async(values) => {
    try {
      let sql = 'INSERT INTO invite_code (code) VALUES ($1) RETURNING *';
      let result = await executeQuery(sql, values);
      return result;
    } catch (error) {
      throw error;
    }
  }

  getInviteCodes = async() => {
    try {
      let sql = 'SELECT code_id, code, used, created_at FROM invite_code ORDER BY created_at DESC';
      let result = await executeQuery(sql);
      return result;
    } catch (error) {
      throw error;
    }
  }

  deleteInviteCode = async(values) => {
    try {
      let sql = 'DELETE FROM invite_code WHERE code_id = $1';
      let result = await executeQuery(sql, values);
      return result;
    } catch (error) {
      throw error;
    }
  }
}

export default new adminDal();
