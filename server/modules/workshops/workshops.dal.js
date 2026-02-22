  import executeQuery from "../../config/db.js";

  class workshopDal {

    createWorkshop = async(values) => {
    try {
      let sql = 'INSERT INTO workshop (workshop_name, description, city, duration, workshop_start_date, workshop_end_date) VALUES (?,?,?,?,?,?)'
      let result = await executeQuery(sql, values);
      } catch (error) {
      throw error
      }
    }

    allWorkshops = async() => {
      try {
        let sql = 'SELECT * FROM workshop'
        let result = await executeQuery(sql);
        return result;
      } catch (error) {
        throw error;
      }
    }

    editWorkshop = async(values) => {
      try {
        let sql = 'UPDATE workshop SET  workshop_name = ?, description = ?, city = ?, duration = ? ,workshop_start_date = ?, workshop_end_date = ? WHERE workshop_id = ?'
        let result = await executeQuery(sql, values); 
        return result;
      } catch (error) {
        throw error;
      } 
    }

    deleteWorkshop = async(values) => {
      try {
        let sql = 'DELETE FROM workshop WHERE workshop_id = ?';
        await executeQuery(sql,values);
      } catch (error) {
        throw error; 
      }
    }
  }
  
 export default new workshopDal();
