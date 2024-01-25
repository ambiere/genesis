require('dotenv').config()
const app = require('../server/server')
const pkg = require('../../package.json')
const log = require('../server/util/startup-log')

const port = process.env.PORT || 3000
const server = app.listen(port, '0.0.0.0', () => {
  log(server.address(), pkg)
})
