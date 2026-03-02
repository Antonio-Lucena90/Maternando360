import executeQuery from '../../config/db.js'

class UserDal{
  register = async(values)=>{
    try{
      let sql = 'INSERT INTO user (name, last_name, email, phone, birth_date, password) VALUES (?,?,?,?,?,?)'
      let result = await executeQuery(sql, values)
      return result
    }catch(error){
      throw error
    }
  }

  findUserByEmail = async (values) =>{
    try{
      let sql = 'SELECT user_id, password FROM user WHERE email = ? AND is_deleted = 0'
      let result = await executeQuery(sql, values)
      return result;
    }catch(error){
      throw error;
    }
  }
  oneUser = async (values) =>{
    try{
      let sql = 'SELECT user_id, name, last_name, email, phone, birth_date, type FROM user WHERE user_id = ? AND is_deleted = 0'
      let result = await executeQuery(sql, values)
      return result; 
    }catch(error){
      throw error;
    }
  }
  editUser = async(values) =>{
    try{
      let sql = 'UPDATE user SET name=?, last_name=?, phone=?, birth_date=? WHERE user_id =? AND is_deleted = 0'
      await executeQuery(sql, values)
    }catch(error){
      throw error; 
    }
  }

  deleteUserLogic = async (values) => {
    try{
      let sql = 'UPDATE user SET is_deleted = 1, type = 0 WHERE user_id = ?'
      await executeQuery(sql, values); 
    }catch(error){
      throw error;
    }
  }

  isUserRegistered = async (values) =>{
    try {
      let sql = 'SELECT * FROM workshop_user WHERE user_id = ? AND workshop_id = ? LIMIT 1'
      const result = await executeQuery(sql, values);
      return result; 
    } catch (error) {
      throw error
    }
  }

  workshopRegistration = async(values) => {
    try {     
      let sql = 'INSERT INTO workshop_user (user_id, workshop_id) VALUES (?,?)'
      const result = await executeQuery(sql, values);
      return result;
    } catch (error) {
      throw error;
    }
  }

  fetchWorkshop = async(values) =>{
    try {
      let sql = 'SELECT w.* FROM workshop w INNER JOIN workshop_user wu ON w.workshop_id = wu.workshop_id WHERE wu.user_id = ?'
      const result = await executeQuery(sql, values);
      return result; 
    } catch (error) {
      throw error;
    }
  }
}

export default new UserDal();