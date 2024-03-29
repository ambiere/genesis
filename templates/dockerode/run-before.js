'use strict'

const t = require('tap')
const dockerHelper = require('./docker-helper')

const docker = dockerHelper()
const { Containers } = dockerHelper

t.before(async function before () {
  t.setTimeout(0)
  await docker.startContainer(Containers.mongo)
})
