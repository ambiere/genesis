const t = require('tap')
const request = require('supertest')
const app = require('../../src/server/server')

t.test('description', async (t) => {
  await request(app)
})
