import adminDal from "./admin.dal.js";

class adminController {
  allUsers = async(req, res) => {
    try {
      const result = await adminDal.allUsers();
      res.status(200).json({message:'ok', result})
    } catch (error) {
      console.log(error);
      res.status(500).json(error)      
    }
  }
}

export default new adminController(); 