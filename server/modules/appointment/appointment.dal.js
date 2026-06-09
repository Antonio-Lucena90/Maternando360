import executeQuery from "../../config/db.js";

class appointmentDal {

    getAllUsers = async () => {
      try {
      let sql = 'SELECT user_id, name, last_name, birth_date, email, phone, baby_name FROM "user" WHERE type = 2';
      let result = await executeQuery(sql, []);
      return result;
      } catch (error) {
        throw error;
      }
    }

    createAppointment = async (values) => {
  try {
    let sql = 'INSERT INTO appointment (user_id, appointment_date, appointment_time, notes) VALUES ($1, $2, $3, $4)';
    let result = await executeQuery(sql, values);
    return result;
  } catch (error) {
    throw error;
  }
}


    getUserAppointments = async (values) => {
      try {
      let sql = 'SELECT * FROM appointment WHERE user_id = $1 ORDER BY appointment_date, appointment_time';
      let result = await executeQuery(sql, values);
      return result;
    } catch (error) {
      throw error;
  }
}

}

export default new appointmentDal(); 