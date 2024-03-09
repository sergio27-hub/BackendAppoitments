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

export async function updateUserByIdController(req, res, next) {
  try {
    const { username, password, email, role } = req.body;

    console.log(req.body);

    // Obtener el ID del usuario de la solicitud
    const id = req.params.id;

    // Verificar si se proporciona un ID en la solicitud
    if (!id) {
      // Si no se proporciona un ID, asumimos que el usuario está tratando de crear un nuevo usuario
      // Crear un nuevo usuario con los datos proporcionados en la solicitud
      const newUser = await createUser({
        username: username,
        password: await encryptPassword(password),
        email: email,
      });

      // Asignar roles al nuevo usuario si se proporcionan en la solicitud
      if (role) {
        const foundRoles = await Role.find({ name: { $in: role } });
        newUser.role = foundRoles.map(role => role._id);
      } else {
        // Si no se proporcionan roles, asignar el rol predeterminado
        const userRole = await Role.findOne({ name: 'user' });
        newUser.role = [userRole._id];
      }

      // Guardar el nuevo usuario en la base de datos
      const savedUser = await newUser.save();

      // Devolver la respuesta con el usuario creado
      return res.status(201).json(savedUser);
    } else {
      // Si se proporciona un ID, actualizar los datos del usuario existente
      // Obtener el usuario de la base de datos utilizando el ID
      const user = await getUserById(id);

      // Verificar si el usuario existe
      if (!user) {
        // Si el usuario no existe, devolver un mensaje de error
        return res.status(404).json({ message: 'User not found' });
      }

      // Actualizar los datos del usuario existente con los datos proporcionados en la solicitud
      const updatedUser = await updateUserById(id, req.body);

      // Devolver la respuesta con el usuario actualizado
      return res.json(updatedUser);
    }
  } catch (error) {
    // Manejar errores
    next(error);
  }
}

export async function updateUserByIdPatchController(req, res, next) {
  try {
    const id = req.params.id;
    const {username , password ,email , role} = req.body;

    console.log(req.body);

    // Verificar si se proporciona un ID en la solicitud
    if (!id) {
      // Si no se proporciona un ID, devolver un mensaje de error
      return res.status(400).json({ message: 'User ID is required' });
    }

    // Actualizar el usuario existente con los datos proporcionados en la solicitud
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
