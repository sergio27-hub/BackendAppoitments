import express from 'express';
import { init } from './loaders/index.js';
import config from './config.js';
import { createRoles } from './libs/initialSetup.js';
// import { createInitialUsers } from './libs/initialUsers.js';

const app = express();
createRoles();
// createInitialUsers();

init(app, config);

export default app;
