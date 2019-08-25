const PersonQueue = require('../src/queue/PersonQueue');
const personQueue = new PersonQueue(true).SavePersonConsumer

test('Test object', () => {
  expect(personQueue("{Nome: 'Rafael'}")).toBe("{Nome: 'Rafael'}");
});