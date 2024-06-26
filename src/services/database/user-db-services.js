import { User} from '../../models/index.js';

export async function getUserByName(user) {
  const userdata = await User.findOne({ username : user});
  console.log(user);
  return userdata;
}

export async function getUserByEmail(email) {
  const user = await User.findOne({ email });
  console.log(user);
  return user;
}

export async function updateUserById(id, user) {
  const updateUser = await User.findByIdAndUpdate(id, user, { new: true });
  return updateUser;
}

export async function updateUserByName(username, user) {
  const updateUser = await User.findOneAndUpdate({ username }, user, { new: true });
  return updateUser;
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
    username : { $regex: name || '', $options: 'i' },
    // username : name && new RegExp(name, 'i') : undefined
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

export async function findAdminUser() {
  const adminUser = await User.findOne({ role: 'admin' });
  return adminUser;
}
