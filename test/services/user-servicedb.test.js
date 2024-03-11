import test from 'ava';
import sinon from 'sinon';
import User from '../../src/models/User.js';
import {
  getUserByName,
  updateUserById,
  deleteUserById,
  getUserById,
  getUsers,
  createUser,
  findAdminUser
} from '../../src/services/database/user-db-services.js';

test.beforeEach(() => {
  sinon.restore(); // Asegura que todos los stubs/mocks sean restaurados antes de cada prueba
});

test('getUserByName - should return a user by username', async t => {
  const userMock = { username: 'testUser', email: 'test@example.com' };
  const findOneStub = sinon.stub(User, 'findOne').resolves(userMock);

  const result = await getUserByName('testUser');

  t.true(findOneStub.calledWith({ username: 'testUser' }));
  t.deepEqual(result, userMock);
});

test('updateUserById - should update and return the user', async t => {
  const userUpdate = { name: 'Updated Name' };
  const userUpdatedMock = { _id: '1', username: 'testUser', name: 'Updated Name' };
  const findByIdAndUpdateStub = sinon.stub(User, 'findByIdAndUpdate').resolves(userUpdatedMock);

  const result = await updateUserById('1', userUpdate);

  t.true(findByIdAndUpdateStub.calledWith('1', userUpdate, { new: true }));
  t.deepEqual(result, userUpdatedMock);
});

test('deleteUserById - should delete and return the user', async t => {
  const userDeletedMock = { _id: '1', username: 'testUser', name: 'Name' };
  const findByIdAndDeleteStub = sinon.stub(User, 'findByIdAndDelete').resolves(userDeletedMock);

  const result = await deleteUserById('1');

  t.true(findByIdAndDeleteStub.calledWith('1'));
  t.deepEqual(result, userDeletedMock);
});

test('getUsers - should return users based on filters', async t => {
  const usersMock = [
    { _id: '1', username: 'JohnDoe', email: 'john@example.com', role: [] },
    { _id: '2', username: 'JaneDoe', email: 'jane@example.com', role: [] },
  ];

  const findStub = sinon.stub(User, 'find').returns({
    select: sinon.stub().resolves(usersMock)
  });

  const result = await getUsers({});

  t.true(findStub.calledOnce);
  t.deepEqual(result, usersMock);

  findStub.restore();
});
