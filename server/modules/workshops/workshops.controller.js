import workshopsDal from "./workshops.dal.js";

class workshopController {

    createWorkshop =async (req, res) => {

    const {workshop_name, description, city, duration, workshop_start_date, workshop_end_date} = req.body;
    try {
      const result = await workshopsDal.createWorkshop([workshop_name, description, city, duration, workshop_start_date, workshop_end_date]);
      res.status(200).json({message:'ok'})
    } catch (error) {
      res.status(500).json(error);
    }
  }

  allWorkshops = async (req, res) => {
    try {
      const result = await workshopsDal.allWorkshops();
      res.status(200).json({message:'ok', result}); 
    } catch (error) {
      res.status(500).json(error);
    }
  }

  editWorkshop = async(req, res) => {
    const {id} = req.params
    const {workshop_name, city, duration, workshop_start_date, workshop_end_date, description} = req. body;
    try {
      const result = await workshopsDal.editWorkshop([workshop_name, city, duration, workshop_start_date, workshop_end_date, description, id]);
      res.status(200).json({message: 'ok'});
    } catch (error) {
      res.status(500).json(error);
    }
  }

}

export default new workshopController(); 