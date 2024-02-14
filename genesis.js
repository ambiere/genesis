const path = require("path")
const argv = require("yargs-parser")
const generify = require("generify")
const log = require("./src/utils/log.js")
const { green, gray } = require("kolorist")
const { execSync } = require("child_process")
const logUtil = require("./src/utils/cli-log.js")
const editPkg = require("./src/utils/edit-pkg.js")
const editOpts = require("./src/utils/edit-opts.js")
const { readFile, writeFile, existsSync, mkdirSync, rmdirSync } = require("fs")
const plus = require("./src/utils/plus.js")

function genesis(dest, pkgTemp, opts) {
  return async function () {
    const tempsPath = path.join(__dirname, "templates")
    const readmePath = path.join(tempsPath, "readme")
    const licensePath = path.join(tempsPath, "license")
    const codeOfConductPath = path.join(tempsPath, "code-of-conduct")
    const contributingPath = path.join(tempsPath, "contributing")
    const configsPath = path.join(tempsPath, "configs")
    const dockerodePath = path.join(tempsPath, "dockerode")
    const workflowsPath = path.join(tempsPath, "workflows")
    const onFile = (file) => {
      log("debug", "      " + file)
      console.log(`\x1B[1A${green("+")}\x1B[${file.length + 6}C ${gray(plus(file))}`)
    }
    mkdirSync(path.join(__dirname, dest), { recursive: true })
    function done(err) {
      if (err) throw err
      process.chdir(dest)
      execSync("pnpm init")
      log("debug", `2: [pkg] reading package.json`)
      function readCallback(err, data) {
        if (err) throw err
        const pkg = JSON.parse(data)
        editPkg(pkg, pkgTemp, opts)
        log("debug", "3: [pkg] package.json edited successfully")
        log("debug", "4: [pkg] saving package.json")
        function writeCallback(err) {
          if (err) throw err
          pkgTemp.info(pkg, dest)
        }
        editOpts(opts, pkg)
        writeFile("package.json", JSON.stringify(pkg, null, 2), writeCallback)
        generify(readmePath, ".", opts, (err) => {})
        generify(licensePath, ".", opts, (err) => {})
        generify(codeOfConductPath, ".", opts, (err) => {})
        generify(contributingPath, ".", opts, (err) => {})
        generify(configsPath, ".", {}, (err) => {})
        generify(workflowsPath, ".", opts, (err) => {})
        opts.mongo && generify(dockerodePath, "./test/dockerode", opts, (err) => {})
        const expressStartupLogDestPath = path.join(dest, "src/server/util")
        const expressStartupLogTempPath = path.join(tempsPath, pkgTemp.dir, "src/server/util")
        if (opts.template === "express") {
          existsSync(expressStartupLogDestPath) && rmdirSync(expressStartupLogDestPath)
          generify(expressStartupLogTempPath, "./src/server/util", opts, (err) => {})
        }
      }
      readFile("package.json", readCallback)
    }
    log("debug", "1: [files] adding project files")
    generify(path.join(tempsPath, pkgTemp.dir), dest, opts, onFile, done)
  }
}

async function genesisCli(args) {
  try {
    let template
    const opts = argv(args)
    const dir = opts._[0]
    const dirNotProvided = dir === undefined
    const notCurrentDir = dir !== "." && dir !== "./"
    const pkgExist = existsSync(path.join(dir, "package.json"))
    const dirExist = dir && existsSync(dir) && notCurrentDir
    const tempOptProvided = opts.template !== undefined || opts.t !== undefined
    const isFastifyTemp = tempOptProvided && (opts.template === "fastify" || opts.t === "fastify")
    const isExpressTemp = tempOptProvided && (opts.template === "express" || opts.t === "express")
    const useDefaultTemp = !tempOptProvided
    pkgExist && logUtil.pkgExist()
    dirExist && logUtil.dirExist(opts._[0])
    dirNotProvided && logUtil.dirUndefined()
    isFastifyTemp && (template = { ...require("./templates/package/fastify-package.js") })
    useDefaultTemp && (template = { ...require("./templates/package/fastify-package.js") })
    isExpressTemp && (template = { ...require("./templates/package/express-package.js") })
    const pkgOpts = {
      name: opts.n || opts.name,
      template: opts.template || opts.t,
      mongo: opts.mongo || opts.m,
      description: (opts.d || opts.description) ?? "",
      license: opts.l || opts.license,
      author: (opts.a || opts.author) ?? "",
      email: (opts.e || opts.email) ?? "",
      copyrightName: (opts.N || opts.copyrightName) ?? "",
      copyrightYear: (opts.Y || opts.copyrightYear) ?? new Date().getFullYear().toString(),
      username: (opts.user || opts.username) ?? "",
    }
    await genesis(dir, template, pkgOpts)()
  } catch (error) {
    log("error", error.message)
    log("debug", "\nLauch 'genesis help [command]' to learn more about each command.")
    process.exit(1)
  }
}

module.exports = {
  genesis,
  genesisCli,
}
