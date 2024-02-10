function plus(file) {
  const len = Math.floor(process.stdout.columns - 12)
  const count = len - (file.length + 6)
  return "+".repeat(count < 0 ? 0 : count)
}

module.exports = plus
