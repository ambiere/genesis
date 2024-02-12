"use strict"
const log = require("../utils/log")

const logUtil = {
  dirExist: (_dir) => {
    log("error", `[dirError] Directory ${_dir} already exists`)
    process.exit(1)
  },
  dirUndefined: () => {
    log("error", "[dirError] Must specify a directory to 'orign'")
    process.exit(1)
  },
  pkgExist: () => {
    log("error", "[pkgError] A package.json file already exists in target directory")
    process.exit(1)
  },
  warn: (prop) => {
    const msg = prop === "username" ? "author name" : "author email"
    log("warn", `\n[WARN] ${prop} option not provided and the ${msg} in package.json is empty. <${prop}> placeholder not updated\n`)
  },
}

module.exports = logUtil
