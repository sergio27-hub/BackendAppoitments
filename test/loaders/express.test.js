import test from 'ava';
import express from 'express';
import request from 'supertest';
import expressLoader from '../../src/loaders/express-loader.js';

const app = express();

expressLoader(app);

test('send request 200 ok', async t => {
  const response = await request(app).get('/ping');
  t.is(response.statusCode, 200);
});

test('send request 404 not found', async t => {
  const response = await request(app).get('/not found');
  t.is(response.status, 404);
});
