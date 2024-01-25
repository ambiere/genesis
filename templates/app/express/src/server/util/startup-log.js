require('dotenv').config()
const argv = require('yargs-parser')
const { gray, cyan } = require('kolorist')

function startupLog (address, pkg) {
  console.log('\u001b[32m[server]', 'up and running\u001b[0m\n')
  console.log(gray(`__name__ version: ${pkg.version}\n`))
  console.log(cyan("\\(॰ ꤮ ॰)/ What's up there?"))
  console.log(gray('\nHome'))
  console.log(`http://${address.address}:${address.port}/v${pkg.version.at(0)}/api/__name__`)
  console.log(gray('...'))
}

module.exports = startupLog

if (require.main === module && process.env.NODE_ENV) {
  const args = argv(process.argv.slice(2))
  startupLog({ address: args.address, port: args.port }, { version: args.version })
}
