const UserQueue = require('../queue/UserQueue');
const userQueue = new UserQueue({ test: true });
const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config({ path: process.env.NODE_ENV === "test" ? ".env.testing" : ".env" });

// Connects to database called avengers
beforeAll(async () => {
  const url = process.env.DB_HOST;
  console.log(url);
  await mongoose.connect(url, { useNewUrlParser: true });
});

test('Create user', async () => {
  let data = { name: "User Name", pass: "123456" }
  let res = await userQueue.createUser(data);
  res = { name: res.name, pass: res.pass };
  expect(res).toEqual(data);
});

test('Get all user', async () => {
  let res = await userQueue.getAllUser();
  expect(res.length).toBeGreaterThan(0);
});

// Disconnect Mongoose
afterAll(async () => {
  await User.deleteMany({}, () => console.log(''))
  await mongoose.connection.close()
});