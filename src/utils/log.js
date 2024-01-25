'use strict'

const kolorist = require('kolorist')

const levels = {
  debug: 0,
  warn: 1,
  info: 2,
  error: 3
}

const colors = [(l) => l, kolorist.yellow, kolorist.green, kolorist.red]

function log (severity, line) {
  const level = levels[severity] || 0
  if (level === 2) line = '--> ' + line
  console.log(colors[level](line))
}

module.exports = log
