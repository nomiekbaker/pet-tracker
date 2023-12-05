const express = require("express")
const router = express.Router();
const fs = require('fs');
const trackerRoutes = require('./tracker.js')
const indexRouter = require("./index");

router.use(trackerRoutes)

module.exports = router;
