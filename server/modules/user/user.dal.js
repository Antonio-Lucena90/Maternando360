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
      let sql = 'SELECT user_id, password FROM user WHERE email = ? AND user_is_deleted = 0'
      let result = await executeQuery(sql, values)
      return result;
    }catch(error){
      throw error;
    }
  }
  oneUser = async (values) =>{
    try{
      let sql = 'SELECT user_id, name, last_name, email, phone, birth_date, type FROM user WHERE user_id = ? AND user_is_deleted = 0'
      let result = await executeQuery(sql, values)
      return result; 
    }catch(error){
      throw error;
    }
  }
  editUser = async(values) =>{
    try{
      let sql = 'UPDATE user SET name=?, last_name=?, phone=?, birth_date=? WHERE user_id =? AND user_is_deleted = 0'
      await executeQuery(sql, values)
    }catch(error){
      throw error; 
    }
  }
}

export default new UserDal();