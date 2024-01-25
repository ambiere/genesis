const color = require('kolorist')
const log = require('../../src/utils/log.js')
const pkg = require('../../package.json')

const fastifyPackageTemplate = {
  dir: 'app/fastify',
  main: 'src/server.js',
  tye: 'commonjs',
  directories: {
    test: 'test',
    src: 'src'
  },
  scripts: {
    lint: 'standard',
    'lint:fix': 'standard --fix',
    pretest: 'pnpm run lint',
    test: 'cross-env NODE_ENV=test tap "test/**/*.test.js" --no-check-coverage',
    'test:coverage': 'cross-env NODE_ENV=test tap --coverage-report=html test/**/*.test.js" --no-check-coverage',
    start: 'cross-env NODE_ENV=production fastify start -l info --options src/server.js',
    dev: 'fastify start --options -w --debug src/server.js',
    prepare: "node .husky/install.js",
    version: 'cz bump',
    'docker:compose': 'docker-compose -f docker-compose.yml up'
  },
  mongoScripts: {
    test: 'cross-env NODE_ENV=test tap --before=test/dockerode/run-before.js "test/**/*.test.js" --after=test/dockerode/run-after.js --no-check-coverage',
    'test:nostop': 'cross-env NODE_ENV=test tap --before=test/dockerode/run-before.js "test/**/*.test.js" --no-check-coverage',
    'test:coverage':
      'cross-env NODE_ENV=test tap --coverage-report=html --before=test/dockerode/run-before.js "test/**/*.test.js" --after=test/dockerode/run-after.js --no-check-coverage',
    dev: 'pnpm run mongo:start && fastify start --options -w -T 0 --debug src/server.js ',
    'mongo:start': 'docker run -d -p 27017:27017 --rm',
    'mongo:stop': 'docker container stop'
  },
  license: 'MIT',
  dependencies: {
    '@fastify/autoload': pkg.dependencies['@fastify/autoload'],
    '@fastify/cors': pkg.dependencies['@fastify/cors'],
    '@fastify/env': pkg.dependencies['@fastify/env'],
    '@fastify/sensible': pkg.dependencies['@fastify/sensible'],
    fastify: pkg.dependencies.fastify,
    'fastify-cli': pkg.dependencies['fastify-cli'],
    'fastify-plugin': pkg.devDependencies['fastify-plugin'] || pkg.dependencies['fastify-plugin'],
    'pino-pretty': pkg.devDependencies['pino-pretty'] || pkg.dependencies['pino-pretty']
  },
  devDependencies: {
    'cross-env': pkg.devDependencies['cross-env'],
    husky: pkg.devDependencies.husky,
    'lint-staged': pkg.devDependencies['lint-staged'],
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
