import test from 'ava';
import sinon from 'sinon';
import { errorMiddleware } from '../../src/middlewares/error-middleware.js';
import logger from '../../src/utils/logger.js';

test('errorMiddleware - should log the error and respond with the correct status and message for general errors', async t => {
  const loggerErrorStub = sinon.stub(logger, 'error');

  const err = new Error('Test error');
  const req = {};
  const res = { status: sinon.stub().returnsThis(), send: sinon.stub() };
  const next = sinon.stub();

  // Simular un error genérico sin un código de estado específico
  errorMiddleware(err, req, res, next);

  t.true(loggerErrorStub.calledWith(`${err.message} ${err.stack}`));
  t.true(res.status.calledWith(500));
  t.true(res.send.calledWith({ status: 500, message: 'Server Error' }));

  loggerErrorStub.restore();
});

test('errorMiddleware - should handle specific status codes and custom error messages', async t => {
  const loggerErrorStub = sinon.stub(logger, 'error');

  const customError = new Error('Custom error');
  customError.status = 404;
  const req = {};
  const res = { status: sinon.stub().returnsThis(), send: sinon.stub() };
  const next = sinon.stub();

  // Simular un error específico con un código de estado 404
  errorMiddleware(customError, req, res, next);

  t.true(loggerErrorStub.calledWith(`${customError.message} ${customError.stack}`));
  t.true(res.status.calledWith(404));
  t.true(res.send.calledWith({ status: 404, message: customError.message }));

  loggerErrorStub.restore();
});
