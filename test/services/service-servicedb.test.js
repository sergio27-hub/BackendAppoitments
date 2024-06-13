import test from 'ava';
import sinon from 'sinon';
import Service from '../../src/models/Service.js';
import {
  getServices,
  createService,
  getServiceById,
  deleteServiceById,
  updateServiceById,
  getServicesByCategory,
  getServiceByProviderAndName,
  updateServiceByName,
  getServiceByName
} from '../../src/services/database/services-db-services.js';

test.beforeEach(() => {
  sinon.restore();
});

test('createService - should create and return a service', async t => {
  const serviceMock = { name: 'New Service', provider: 'Provider' };
  const saveStub = sinon.stub(Service.prototype, 'save').resolves(serviceMock);

  const result = await createService(serviceMock);

  t.true(saveStub.calledOnce);
  t.deepEqual(result, serviceMock);
});

test('getServiceById - should return a service by ID', async t => {
  const serviceMock = { _id: '1', name: 'Service1', provider: 'Provider1' };
  const findByIdStub = sinon.stub(Service, 'findById').resolves(serviceMock);

  const result = await getServiceById('1');

  t.true(findByIdStub.calledWith('1'));
  t.deepEqual(result, serviceMock);
});

test('deleteServiceById - should delete and return the service', async t => {
  const serviceMock = { _id: '1', name: 'Service1', provider: 'Provider1' };
  const findByIdAndDeleteStub = sinon.stub(Service, 'findByIdAndDelete').resolves(serviceMock);

  const result = await deleteServiceById('1');

  t.true(findByIdAndDeleteStub.calledWith('1'));
  t.deepEqual(result, serviceMock);
});

test('updateServiceById - should update and return the service', async t => {
  const serviceUpdate = { name: 'Updated Service' };
  const serviceUpdatedMock = { _id: '1', ...serviceUpdate };
  const findByIdAndUpdateStub = sinon.stub(Service, 'findByIdAndUpdate').resolves(serviceUpdatedMock);

  const result = await updateServiceById('1', serviceUpdate);

  t.true(findByIdAndUpdateStub.calledWith('1', serviceUpdate, { new: true }));
  t.deepEqual(result, serviceUpdatedMock);
});

