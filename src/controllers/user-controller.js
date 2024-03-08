import { getUsers ,createUser , deleteUserById , getUserById , getUserByName} from '../services/database/user-db-services.js';
import { encryptPassword } from '../utils/encrypt.js';


export async function getUserMe(req, res, next){
    try {
      const user = await getUserByName(req.user.username);
      return res.send(user);
    } catch (error) {
      next(error);
    }
}

export async function getUsersController(req, res,next ) {
    try {
      const users = await getUsers(req.query);
      return res.send(users);
    } catch (error) {
        next(error);
    }
}


export async function createUserController(req, res, next) {
    try {
      const body = req.body;
      body.password = await encryptPassword(body.password);
      const user = await createUser(req.body);
      return res.status(201).send(user);
    } catch (error) {
      if(error.code === 11000){
        error.status = 409;
      }
      if(error.message.includes('validation')){
        error.status = 400;
      }
      next(error);
    }
}

export async function getUserByIdController(req, res, next) {
    try {
      const user = await getUserById(req.params.id);
      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }
      return res.json(user);
    } catch (error) {
      next(error);
    }
}

export async function deleteUserController(req, res, next) {
    try {
      const userbyid = await getUserById(req.params.id);
      console.log(userbyid);
      const user = await deleteUserById(req.params.id);
      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }
      return res.send(user);
    } catch (error) {
      next(error);
    }
}
