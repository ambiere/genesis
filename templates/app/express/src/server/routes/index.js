'use strict'

const { Router, json, urlencoded } = require('express')
const pinoHttp = require('pino-http')
const loggerOptions = require('../config/pino-http')
const router = Router({ strict: true })

router.use(json())
router.use(urlencoded({ extended: true }))
router.use(pinoHttp({ ...loggerOptions }))

module.exports = router
