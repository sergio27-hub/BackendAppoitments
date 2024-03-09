import express from 'express';
import { init } from './loaders/index.js';
import config from './config.js';
import { createRoles } from './libs/initialSetup.js';

const app = express();
createRoles();

init(app, config);

export default app;
