const color = require('kolorist')
const log = require('../../src/utils/log.js')
const pkg = require('../../package.json')

const fastifyPackageTemplate = {
  dir: 'app/express',
  main: 'src/bin/index.js',
  tye: 'commonjs',
  directories: {
    test: 'test',
    src: 'src',
    public: 'public'
  },
  scripts: {
    lint: 'standard',
    'lint:fix': 'standard --fix',
    pretest: 'pnpm run lint',
    test: 'cross-env NODE_ENV=test nyc tap "test/**/*.test.js"',
    start: 'node src/bin/index.js',
    dev: 'nodemon --watch src/ src/bin/index.js',
    prepare: "node .husky/install.js",
    version: 'cz bump',
    'docker:compose': 'docker-compose -f docker-compose.yml up'
  },
  mongoScripts: {
    test: 'cross-env NODE_ENV=test nyc tap --before=test/dockerode/run-before.js "test/**/*.test.js" --after=test/dockerode/run-after.js --no-check-coverage',
    'test:nostop': 'cross-env NODE_ENV=test nyc tap --before=test/dockerode/run-before.js "test/**/*.test.js" --no-check-coverage',
    'test:coverage':
      'cross-env NODE_ENV=test nyc tap --coverage-report=html --before=test/dockerode/run-before.js "test/**/*.test.js" --after=test/dockerode/run-after.js --no-check-coverage',
    dev: 'pnpm run mongo:start && nodemon --watch src/ src/bin/index.js',
    'mongo:start': 'docker run -d -p 27017:27017 --rm',
    'mongo:stop': 'docker container stop'
  },
  license: 'MIT',
  dependencies: {
    compression: pkg.dependencies.compression,
    cors: pkg.dependencies.cors,
    dotenv: pkg.dependencies.dotenv,
    express: pkg.dependencies.express,
    kolorist: pkg.dependencies.kolorist,
    'pino-pretty': pkg.devDependencies['pino-pretty'] || pkg.dependencies['pino-pretty'],
    'pino-http': pkg.devDependencies['pino-http'] || pkg.dependencies['pino-http']
  },
  devDependencies: {
    'cross-env': pkg.devDependencies['cross-env'],
    husky: pkg.devDependencies.husky,
    'lint-staged': pkg.devDependencies['lint-staged'],
    nodemon: pkg.devDependencies.nodemon,
    nyc: pkg.devDependencies.nyc,
    supertest: pkg.devDependencies.supertest,
    standard: pkg.devDependencies.standard,
    tap: pkg.devDependencies.tap
  },
  devDependenciesOpts: {
    dockerode: '^4.0.0'
  },
  info: (pkg) => {
    log('debug', '[pkg] Saved package.json')
    log('info', `[${pkg.name}] Generated successfully`)
    log('debug', `[${color.bold('npm install')}] Install the dependencies`)
    log('debug', `[${color.bold('npm start')}] Start the application`)
    log('debug', `[${color.bold('npm run dev')}] Start the application in dev`)
    log('debug', `[${color.bold('npm test')}] Execute the unit tests`)
    log('debug', `[${color.bold('npm lint')}] Lint and fix code style issues`)
  }
}

module.exports = fastifyPackageTemplate
