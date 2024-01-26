#!/usr/bin/env node

const path = require('path')
const commist = require('commist')()
const argv = require('yargs-parser')(process.argv)
const help = require('help-me')({ dir: path.join(path.dirname(require.main.filename), '../..', 'help') })

const generate = require('../../genes')
commist.register('', () => console.log('called'))
commist.register('generate', generate.genesCli)
commist.register('help', help.toStdout)
commist.register('version', function () {
  console.log(require('../../package.json').version)
})

if (argv.help || (Object.keys(argv).length === 1 && argv._.splice(2).length === 0)) {
  help.toStdout(typeof argv.help === 'string' && argv.help !== 'version' ? argv.help : undefined)
} else commist.parse(process.argv.splice(2).filter((arg) => arg !== 'version'))
