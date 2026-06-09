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

  getAllAppointments = async () => {
  try {
    let sql = `SELECT a.appointment_id, a.appointment_date, a.appointment_time, a.notes, 
               u.name, u.last_name 
               FROM appointment a 
               JOIN "user" u ON a.user_id = u.user_id 
               ORDER BY a.appointment_date, a.appointment_time`;
    return await executeQuery(sql, []);
  } catch (error) {
    throw error;
  }
}

deleteAppointment = async (values) => {
  try {
    let sql = 'DELETE FROM appointment WHERE appointment_id = $1';
    return await executeQuery(sql, values);
  } catch (error) {
    throw error;
  }
}

updateAppointment = async (values) => {
  try {
    let sql = 'UPDATE appointment SET appointment_date = $1, appointment_time = $2, notes = $3 WHERE appointment_id = $4';
    return await executeQuery(sql, values);
  } catch (error) {
    throw error;
  }
}


}

export default new appointmentDal(); 