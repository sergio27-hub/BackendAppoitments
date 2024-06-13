import { createUserController } from '../controllers/user-controller.js';
import { getUsers } from '../services/database/user-db-services.js';
import { encryptPassword } from '../utils/encrypt.js';
import User from '../models/user.js';

export const createInitialUsers = async () => {
  try {
    const count = await User.estimatedDocumentCount();

    if (count > 0) return;
    const initialUser = {
      username: 'admin',
      password: await encryptPassword('adminPassword'),
      email: 'admin@example.com',
      role: ['admin', 'superuser', 'provider']
    };

    // Llama al controlador para crear el usuario
    await createUserController({
      body: initialUser,
      file: null
    }, {
      status: () => ({ send: () => {} })
    }, () => {});

    console.log('Initial user created');
  } catch (error) {
    console.error('Error creating initial user:', error);
  }
};

export default createInitialUsers;
