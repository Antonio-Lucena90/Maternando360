import executeQuery from '../../config/db.js'

class UserDal{
  register = async(values)=>{
    try{
      let sql = 'INSERT INTO "user" (name, last_name, email, password, baby_name) VALUES ($1,$2,$3,$4,$5)'
      let result = await executeQuery(sql, values)
      return result
    }catch(error){
      throw error
    }
  }

  findUserByEmail = async (values) =>{
    try{
      let sql = 'SELECT user_id, password FROM "user" WHERE email = $1 AND is_deleted = false'
      let result = await executeQuery(sql, values)
      return result;
    }catch(error){
      throw error;
    }
  }

  oneUser = async (values) =>{
    try{
      let sql = 'SELECT user_id, name, last_name, email, phone, birth_date, type, baby_name FROM "user" WHERE user_id = $1 AND is_deleted = false'
      let result = await executeQuery(sql, values)
      return result;
    }catch(error){
      throw error;
    }
  }

  editUser = async(values) =>{
    try{
      let sql = 'UPDATE "user" SET name=$1, last_name=$2, phone=$3, birth_date=$4, baby_name=$5 WHERE user_id=$6 AND is_deleted = false'
      await executeQuery(sql, values)
    }catch(error){
      throw error;
    }
  }

  deleteUserLogic = async (values) => {
    try{
      let sql = 'UPDATE "user" SET is_deleted = true, type = 0 WHERE user_id = $1'
      await executeQuery(sql, values);
    }catch(error){
      throw error;
    }
  }

  isUserRegistered = async (values) =>{
    try {
      let sql = 'SELECT * FROM workshop_user WHERE user_id = $1 AND workshop_id = $2 LIMIT 1'
      const result = await executeQuery(sql, values);
      return result;
    } catch (error) {
      throw error
    }
  }

  workshopRegistration = async(values) => {
    try {
      let sql = 'INSERT INTO workshop_user (user_id, workshop_id) VALUES ($1,$2)'
      const result = await executeQuery(sql, values);
      return result;
    } catch (error) {
      throw error;
    }
  }

  fetchWorkshop = async(values) =>{
    try {
      let sql = 'SELECT w.* FROM workshop w INNER JOIN workshop_user wu ON w.workshop_id = wu.workshop_id WHERE wu.user_id = $1'
      const result = await executeQuery(sql, values);
      return result;
    } catch (error) {
      throw error;
    }
  }

  uploadDocument = async(values) => {
    try {
      let sql = 'INSERT INTO document (user_id, original_name, file_name, uploaded_by) VALUES ($1,$2,$3,\'user\')'
      const result = await executeQuery(sql, values);
      return result;
    } catch (error) {
      throw error;
    }
  }

  getUserDocuments = async(values) => {
    try {
      let sql = 'SELECT doc_id, original_name, file_name, uploaded_at, uploaded_by FROM document WHERE user_id = $1 ORDER BY uploaded_at DESC'
      const result = await executeQuery(sql, values);
      return result;
    } catch (error) {
      throw error;
    }
  }

  getDocumentById = async(values) => {
    try {
      let sql = 'SELECT * FROM document WHERE doc_id = $1 AND user_id = $2'
      const result = await executeQuery(sql, values);
      return result;
    } catch (error) {
      throw error;
    }
  }

  deleteDocument = async(values) => {
    try {
      let sql = 'DELETE FROM document WHERE doc_id = $1 AND user_id = $2'
      const result = await executeQuery(sql, values);
      return result;
    } catch (error) {
      throw error;
    }
  }

  createSleepRecord = async(values) => {
    try {
      let sql = 'INSERT INTO sleep_record (user_id, sleep_date, start_time, end_time, comment) VALUES ($1,$2,$3,$4,$5)'
      const result = await executeQuery(sql, values);
      return result;
    } catch (error) {
      throw error;
    }
  }

  getSleepRecords = async(values) => {
    try {
      let sql = 'SELECT * FROM sleep_record WHERE user_id = $1 ORDER BY sleep_date, start_time'
      const result = await executeQuery(sql, values);
      return result;
    } catch (error) {
      throw error;
    }
  }

  deleteSleepRecord = async(values) => {
    try {
      let sql = 'DELETE FROM sleep_record WHERE record_id = $1 AND user_id = $2'
      const result = await executeQuery(sql, values);
      return result;
    } catch (error) {
      throw error;
    }
  }

  getAdminDocuments = async() => {
    try {
      let sql = 'SELECT doc_id, original_name, file_name, uploaded_at FROM admin_document ORDER BY uploaded_at DESC';
      const result = await executeQuery(sql);
      return result;
    } catch (error) {
      throw error;
    }
  }

  getAdminDocumentById = async(values) => {
    try {
      let sql = 'SELECT * FROM admin_document WHERE doc_id = $1';
      const result = await executeQuery(sql, values);
      return result;
    } catch (error) {
      throw error;
    }
  }

  validateInviteCode = async(values) => {
    try {
      let sql = 'SELECT code_id FROM invite_code WHERE code = $1 AND used = false';
      const result = await executeQuery(sql, values);
      return result;
    } catch (error) {
      throw error;
    }
  }

  useInviteCode = async(values) => {
    try {
      let sql = 'UPDATE invite_code SET used = true WHERE code_id = $1';
      await executeQuery(sql, values);
    } catch (error) {
      throw error;
    }
  }
}

export default new UserDal();
