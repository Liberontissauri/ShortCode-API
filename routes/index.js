const express = require("express")
const router = express.Router()

router.use("/apikeys", require("./api_key"))

module.exports = router