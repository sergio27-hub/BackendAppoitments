import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';

import { HttpStatusError } from 'common-errors';
import router from '../routes/index.js';
import { errorMiddleware } from '../middlewares/error-middleware.js';
import { morganMiddleware } from '../config/morgan.js';
import { swaggerDoc } from '../openapi/index.js';

export default function(server){
    /* Config */
    server.use(cors());
    server.use(express.json());
    server.use(express.urlencoded({ extended: true}));
    /* Static files */
    server.use(express.static('public'));
    /* Swagger */
    server.get('/docs', (req, res) => res.send(swaggerDoc));
    server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
    /* MDW */
    server.use(morganMiddleware);
    /* Routes */
    server.use(router);
    /* Error handler */
    server.use((req, res) => {
        errorMiddleware(new HttpStatusError(404, "Resource not found"), req, res);
    });
    server.use(express.static('public'));
}
