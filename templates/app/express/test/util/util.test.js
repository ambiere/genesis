const path = require('path')
const { test } = require('tap')
const util = require('node:util')
const exec = util.promisify(require('node:child_process').exec)

test('should log server info', async (t) => {
  const args = '--address "0.0.0.0" --port 3000 --version 1.0.0'
  const logPath = path.join(__dirname, '../..', 'src/server/util/')
  const { stdout } = await exec(`node ${logPath}/startup-log.js ${args}`)
  t.ok(stdout, 'returned stdout')
  t.match(stdout, '[server] up and running')
})
