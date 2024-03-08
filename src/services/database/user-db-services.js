import { User} from '../../models/index.js';
import { checkHash } from '../../utils/encrypt.js';
import moongose from 'mongoose';

export async function getUserByName(username, password) {
  const user = await User.findOne({ username });

  return user;


}


export async function deleteUserById(id) {
  const deleteduser = await User.findByIdAndDelete(id);
  console.log(deleteduser);
  return deleteduser;
}
export async function getUserById(id) {
  const user = await User.findById({ _id: id });
  return user;
}

export async function getUsers(filters){

  const { name , after , before } = filters;

  const query = {
    username : { $regex: name ? name : '', $options: 'i' },
    //username : name && new RegExp(name, 'i') : undefined
  };

  const cleanedQuery = Object.fromEntries(

    Object.entries(query).filter(([_, v]) => v != undefined)

    );

  if (after) {
    query.createdAt = { $gte: after };
  }

  const users = await User.find(cleanedQuery).select({  password: 0 });


  return users;
}

export async function createUser(user) {
const userDoc = new User(user);
const createdUser = await userDoc.save();
return createdUser;
};

