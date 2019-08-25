const PersonQueue = require('../src/queue/PersonQueue');
const personQueue = new PersonQueue(true).SavePersonConsumer

test('Test object', async () => {
  let data = {
    name: "Rafael Dias",
    email: "rafael.cdc97@gmail.com"
  }
  expect(await personQueue(data)).toBe(data);
});