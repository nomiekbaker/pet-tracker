const express = require('express')
const router = express.Router()
const trackerRoutes = require('./tracker.js')

router.use(trackerRoutes)

module.exports = router
