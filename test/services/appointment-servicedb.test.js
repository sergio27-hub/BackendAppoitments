import test from 'ava';
import sinon from 'sinon';
import Appointment from '../../src/models/appointment.js';
import {
  getAppointments,
  createAppointment,
  getAppointmentById,
  deleteAppointmentById,
  updateAppointmentById,
  getAppointmentsByService,
} from '../../src/services/database/appointment-db-services.js';

test.beforeEach(() => {
  sinon.restore();
});

test('getAppointments - should return all appointments', async t => {
  const appointmentsMock = [
    { _id: '1', provider: 'Provider1', time: '10:00' },
    { _id: '2', provider: 'Provider2', time: '11:00' }
  ];
  const findStub = sinon.stub(Appointment, 'find').resolves(appointmentsMock);

  const result = await getAppointments();

  t.true(findStub.calledOnce);
  t.deepEqual(result, appointmentsMock);
});

test('createAppointment - should create and return an appointment', async t => {
  const appointmentMock = { provider: 'Provider', time: '10:00' };
  const saveStub = sinon.stub(Appointment.prototype, 'save').resolves(appointmentMock);

  const result = await createAppointment(appointmentMock);

  t.true(saveStub.calledOnce);
  t.deepEqual(result, appointmentMock);
});

test('getAppointmentById - should return an appointment by ID', async t => {
  const appointmentMock = { _id: '1', provider: 'Provider1', time: '10:00' };
  const findByIdStub = sinon.stub(Appointment, 'findById').resolves(appointmentMock);

  const result = await getAppointmentById('1');

  t.true(findByIdStub.calledWith('1'));
  t.deepEqual(result, appointmentMock);
});

test('deleteAppointmentById - should delete and return the appointment', async t => {
  const appointmentMock = { _id: '1', provider: 'Provider1', time: '10:00' };
  const findByIdAndDeleteStub = sinon.stub(Appointment, 'findByIdAndDelete').resolves(appointmentMock);

  const result = await deleteAppointmentById('1');

  t.true(findByIdAndDeleteStub.calledWith('1'));
  t.deepEqual(result, appointmentMock);
});

