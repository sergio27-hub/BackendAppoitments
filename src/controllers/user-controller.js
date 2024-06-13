import fs from 'fs';
import path from 'path';
import { getUsers ,createUser , deleteUserById , getUserById , getUserByName ,updateUserById} from '../services/database/user-db-services.js';
import { encryptPassword } from '../utils/encrypt.js';
import Role from '../models/role.js';


// export async function getUserMe(req, res, next){
//     try {
//       const user = await getUserByName(req.user.username);
//       return res.send(user);
//     } catch (error) {
//       next(error);
//     }
// }

export async function getUserMe(req, res, next){
  try {
    // Asumiendo que 'username' es un parámetro de ruta, lo obtenemos de req.params
    const { username } = req.params;
    const user = await getUserByName(username);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json(user);
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
    const { username, password, email, role } = req.body;
    const { errors, warnings } = validacion(username, password, email, req.file, 'Y');

    if (errors.length > 0) {
      return res.status(400).send({ message: errors });
    }

    const newUser = await createUser({
      username,
      password: await encryptPassword(password),
      email,
      image: req.file ? `/uploads/${req.file.filename}` : undefined,
    });

    if (role) {
      const foundRoles = await Role.find({ name: { $in: role } });
      newUser.role = foundRoles.map(role => role._id);
    } else {
      const userRole = await Role.findOne({ name: 'user' });
      newUser.role = [userRole._id];
    }

    const user = await newUser.save();
    return res.status(201).send(user);
  } catch (error) {
    if (error.code === 11000) {
      error.status = 409;
    }
    if (error.message.includes('validation')) {
      error.status = 400;
    }
    next(error);
  }
}
const validacion = (username, password, email, image, sevalida) => {
  const errors = [];
  const warnings = [];

  if (username === undefined || username.trim() === '') {
    errors.push('Username is required');
  }
  if (password === undefined || password.trim() === '') {
    errors.push('Password is required');
  }
  if (email === undefined || email.trim() === '') {
    errors.push('Email is required');
  }
  if (sevalida === 'Y') {
    if (!image || !image.filename) {
      warnings.push('No image provided. Proceeding without an image.');
    }
  }
  return { errors, warnings };
};

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
      await deleteImage(userbyid._id);
      console.log(userbyid);
      const user = await deleteUserById(req.params.id) ;

      if (!user) {
        return res.status(404).send({ message: 'User not found' });
        }


      return res.send({message:'user deleted successfully',user});
    } catch (error) {
      next(error);
    }
}
const deleteImage = async(id) => {
  const user = await getUserById(id);
  if (user && user.image) {
  const imgPath = path.resolve(`./public/${user.image}`);
  try{
    fs.unlinkSync(imgPath);
    console.log(`Image ${imgPath} deleted`);
  }catch(error){
    console.error(`Error deleting image ${imgPath}`);
  }
};
};

export async function updateUserByIdController(req, res, next) {
  try {
    const { username, password, email, role } = req.body;
    const { id } = req.params;

    console.log(req.body);

    if (!id) {
      const newUser = await createUser({
        username,
        password: await encryptPassword(password),
        email,
      });

      if (role) {
        const foundRoles = await Role.find({ name: { $in: role } });
        newUser.role = foundRoles.map(role => role._id);
      } else {
        const userRole = await Role.findOne({ name: 'user' });
        newUser.role = [userRole._id];
      }

      const savedUser = await newUser.save();
      return res.status(201).json(savedUser);
    }

    const user = await getUserById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (req.file) {
      await deleteImage(id);
      req.body.image = `/uploads/${req.file.filename}`;
    }

    if (password) {
      req.body.password = await encryptPassword(password);
    }

    const updatedUser = await updateUserById(id, req.body);

    return res.json(updatedUser);

  } catch (error) {
    next(error);
  }
}
export async function updateUserByIdPatchController(req, res, next) {
  try {
    const { id } = req.params;
    const { username, password, email, role } = req.body;

    console.log(req.body);

    // Verificar si se proporciona un ID en la solicitud
    if (!id) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    // Obtener el usuario de la base de datos utilizando el ID
    const user = await getUserById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Actualizar los datos del usuario existente con los datos proporcionados en la solicitud
    const updatedUserData = {};

    if (username) {
      updatedUserData.username = username;
    }

    if (password) {
      updatedUserData.password = await encryptPassword(password);
    }

    if (email) {
      updatedUserData.email = email;
    }

    if (role) {
      const foundRoles = await Role.find({ name: { $in: role } });
      updatedUserData.role = foundRoles.map(role => role._id);
    }

    if (req.file) {
      await deleteImage(id);
      updatedUserData.image = `/uploads/${req.file.filename}`;
    }

    // Actualizar el usuario en la base de datos
    const updatedUser = await updateUserById(id, updatedUserData);

    // Verificar si se encontró y actualizó correctamente el usuario
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Devolver la respuesta con el usuario actualizado
    return res.json(updatedUser);
  } catch (error) {
    // Manejar errores
    next(error);
  }
}
