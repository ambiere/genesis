const process = require("process")
const readline = require("readline")
const { clearInterval } = require("timers")

const spinnerFrames = ["⣾", "⣽", "⣻", "⢿", "⡿", "⣟", "⣯", "⣷"]

class Spinner {
  spinnerIntervalId
  isStopped
  constructor() {}
  start(msg = "") {
    let index = 0
    process.stdout.write("\x1B[?25l")
    this.spinnerIntervalId = setInterval(() => {
      let now = spinnerFrames[index]
      if (now === undefined) {
        index = 0
        now = spinnerFrames[index]
      }

      process.stdout.write(`\x1B[36m${now}\x1B[0m`)
      process.stdout.write(`\x1B[36m ${msg}\x1B[0m`)
      readline.cursorTo(process.stdout, 0)
      index = index >= spinnerFrames.length ? 0 : index + 1
    }, 80)
  }

  stop(clear = true) {
    clearInterval(this.spinnerIntervalId)
    if (clear) {
      readline.clearLine(process.stdout, 0)
      readline.cursorTo(process.stdout, 0)
      process.stdout.write("\x1B[?25h")
    }
    this.isStopped = this.spinnerIntervalId._destroyed
  }
}

module.exports = Spinner
