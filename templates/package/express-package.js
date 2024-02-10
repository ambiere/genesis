const { bold, green } = require("kolorist")
const log = require("../../src/utils/log.js")
const pkg = require("../../package.json")
const plus = require("../../src/utils/plus.js")

const expressPackageTemplate = {
  dir: "app/express",
  main: "src/bin/index.js",
  tye: "commonjs",
  directories: {
    test: "test",
    src: "src",
    public: "public",
  },
  scripts: {
    lint: "standard",
    "lint:fix": "standard --fix",
    pretest: "pnpm run lint",
    test: 'cross-env NODE_ENV=test nyc tap "test/**/*.test.js"',
    start: "node src/bin/index.js",
    dev: "nodemon --watch src/ src/bin/index.js",
    prepare: "node .husky/install.js",
    version: "cz bump",
    "docker:compose": "docker-compose -f docker-compose.yml up",
  },
  mongoScripts: {
    test: 'cross-env NODE_ENV=test nyc tap --before=test/dockerode/run-before.js "test/**/*.test.js" --after=test/dockerode/run-after.js --no-check-coverage',
    "test:nostop": 'cross-env NODE_ENV=test nyc tap --before=test/dockerode/run-before.js "test/**/*.test.js" --no-check-coverage',
    "test:coverage":
      'cross-env NODE_ENV=test nyc tap --coverage-report=html --before=test/dockerode/run-before.js "test/**/*.test.js" --after=test/dockerode/run-after.js --no-check-coverage',
    dev: "pnpm run mongo:start && nodemon --watch src/ src/bin/index.js",
    "mongo:start": "docker run -d -p 27017:27017 --rm",
    "mongo:stop": "docker container stop",
  },
  license: "MIT",
  dependencies: {
    compression: pkg.dependencies.compression,
    cors: pkg.dependencies.cors,
    dotenv: pkg.dependencies.dotenv,
    express: pkg.dependencies.express,
    kolorist: pkg.dependencies.kolorist,
    "pino-pretty": pkg.devDependencies["pino-pretty"] || pkg.dependencies["pino-pretty"],
    "pino-http": pkg.devDependencies["pino-http"] || pkg.dependencies["pino-http"],
  },
  devDependencies: {
    "cross-env": pkg.devDependencies["cross-env"],
    husky: pkg.devDependencies.husky,
    "lint-staged": pkg.devDependencies["lint-staged"],
    nodemon: pkg.devDependencies.nodemon,
    nyc: pkg.devDependencies.nyc,
    supertest: pkg.devDependencies.supertest,
    standard: pkg.devDependencies.standard,
    tap: pkg.devDependencies.tap,
  },
  devDependenciesOpts: {
    dockerode: "^4.0.0",
  },
  info: (pkg, dest) => {
    log("debug", "5: [pkg] saved package.json")
    log(`debug`, `${green("+")}     package.json ${plus(`package.json`)}\n`)
    log("info", `[${pkg.name}] Generated successfully!\n`)
    log("info", "\x1B[2K՞༅⸙⁂〰༅꙳৽՞⸙꙳⁂〰৽\n\n Happy coding dawg!")

    console.log(`\n get started, run:\n`)
    log("debud", ` cd ${dest}`)
    log("debug", " pnpm install")
    log("debug", " pnpm start")
    log("debug", " pnpm test")
    log("debug", " pnpm lint\n")
  },
}

module.exports = expressPackageTemplate
