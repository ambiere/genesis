#!/usr/bin/env node

const path = require("path")
const commist = require("commist")()
const argv = require("yargs-parser")(process.argv)
const generateInteractively = require("../prompt/prompt")
const help = require("help-me")({ dir: path.join(path.dirname(require.main.filename), "../..", "help") })

const generate = require("../../genes")
commist.register("generate", generate.genesCli)
commist.register("help", help.toStdout)
commist.register("version", function () {
  console.log(require("../../package.json").version)
})

const noCommandProvided = Object.keys(argv).length === 1 && argv._.splice(2).length === 0
const shouldPrintHelp = argv.help || noCommandProvided
if (shouldPrintHelp) {
  const cmdNotVersion = argv.help !== "version"
  help.toStdout(cmdNotVersion ? argv.help : undefined)
} else {
  const commands = process.argv.slice(2)
  if (commands.length === 1 && commands[0] === "generate") generateInteractively()
  else commist.parseAsync(process.argv.splice(2).filter((arg) => arg !== "version"))
}
