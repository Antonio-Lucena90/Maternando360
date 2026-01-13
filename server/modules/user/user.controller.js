import { compareString } from '../../utils/bcryptUtils.js';
import { generateToken } from '../../utils/tokenUtils.js';
import userDal from './user.dal.js'
import bcrypt from 'bcrypt';

class UserController {
  register = async (req, res)=>{
    try{
      const {name, last_name, email, phone, birth_date, password} = req.body;
      const hashedPass = await bcrypt.hash(password, 10);
      const values = [name, last_name, email, phone, birth_date, hashedPass]
      let result = await userDal.register(values)
      res.status(200).json(result)
    }catch(error){
      console.log(error)
      res.status(500).json(error)
    }
  }

  login = async (req, res)=>{
    const {email, password} = req.body;
    try{
      //comprobar si el email existe en BD 
      let result = await userDal.findUserByEmail([email])
      //si no hay usuario con ese mail
      if(result.length === 0){
        res.status(401).json({message:'Email no válido'})
      }else{
        //comprobar contraseña
        let match = await compareString(password, result[0].password);
        if(!match){
          res.status(401).json({message:'Contraseña incorrecta'})
        }else{
          //generamos un token
          const token = generateToken(result[0].user_id)
          res.status(200).json({message:'ok', token});
        }
      }
    }catch(error){  
      res.status(500).json(error)
    }
  }
  oneUser = async(req, res)=>{
    //pedir datos de ususario, que se acaba de loguear
    const {user_id} = req
    try{
      const result = await userDal.oneUser([user_id])
      res.status(200).json({message: 'ok', user: result[0]})
    }catch(error){
      res.status(500).json(error)
    }

  }
  editUser = async(req, res)=>{
    try{
      const {name, last_name, phone, birth_date, user_id} = req.body;
      const values = [name, last_name, phone, birth_date, user_id]
      await userDal.editUser(values)
      res.status(200).json({message: 'Update ok'})
    }catch(error){
      console.log(error)
      res.status(500).json(error)
    }
  }
}
export default new UserController(); 