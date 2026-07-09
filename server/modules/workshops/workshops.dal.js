import executeQuery from "../../config/db.js";

class workshopDal {

  createWorkshop = async(values) => {
    try {
      let sql = 'INSERT INTO workshop (workshop_name, description, city, duration, workshop_start_date, workshop_end_date, price) VALUES ($1,$2,$3,$4,$5,$6,$7)'
      let result = await executeQuery(sql, values);
      return result;
    } catch (error) {
      throw error;
    }
  }

  allWorkshops = async() => {
    try {
      let sql = 'SELECT * FROM workshop';
      let result = await executeQuery(sql);
      return result;
    } catch (error) {
      throw error;
    }
  }

  editWorkshop = async(values) => {
    try {
      let sql = 'UPDATE workshop SET workshop_name=$1, description=$2, city=$3, duration=$4, workshop_start_date=$5, workshop_end_date=$6, price=$7 WHERE workshop_id=$8'
      let result = await executeQuery(sql, values);
      return result;
    } catch (error) {
      throw error;
    }
  }

  deleteWorkshop = async(values) => {
    try {
      let sql = 'DELETE FROM workshop WHERE workshop_id=$1';
      await executeQuery(sql, values);
    } catch (error) {
      throw error;
    }
  }
}

export default new workshopDal();
