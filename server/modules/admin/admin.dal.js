import executeQuery from "../../config/db.js";

class adminDal{
  allUsers = async() => {
    try {
      let sql = 'SELECT name, last_name, birth_date, email, phone FROM user WHERE type = 2';
      let result = await executeQuery(sql);
      return result; 
    } catch (error) {
      throw error
    }
  }
}

export default new adminDal();